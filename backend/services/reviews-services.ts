/* eslint-disable no-param-reassign */
import rolesEnum from '../constants/roles.enum.js';
import errors from '../constants/service-errors.js';
import ProductsData from '../models/ProductsData.js';
import ReviewsData from '../models/ReviewsData.js';
import RolesType from '../models/RolesType.js';

const getAllReviews =
  (reviewsData: ReviewsData, productsData: ProductsData) =>
  async (
    productId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number,
    ratingMin: number,
    ratingMax: number
  ) => {
    const existingProduct = await productsData.getBy('product_id', productId);

    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const reviews = await reviewsData.getAll(
      productId,
      search,
      sort,
      page,
      pageSize,
      ratingMin,
      ratingMax
    );

    return {
      error: null,
      result: reviews
    };
  };

const getReviewById = (reviewsData: ReviewsData) => async (reviewId: number) => {
  const existingReview = await reviewsData.getBy('review_id', reviewId);

  if (!existingReview) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  return {
    error: null,
    result: existingReview
  };
};

const createReview =
  (
    productsData: ProductsData,
    reviewsData: ReviewsData
    // , ordersData, usersData
  ) =>
  async (content: string, userId: number, productId: number, rating: number, title: string) => {
    // checks if the product exists
    const existingProduct = await productsData.getBy('product_id', productId);
    if (!existingProduct) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    // checks if the user has already made a review for the same product
    const existingReview = await reviewsData.getReviewByUserAndProduct(userId, productId);
    if (existingReview) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null
      };
    }

    // // checks if the user has purchased and received the product
    // const isProductReceived = await ordersData.getAllByUser(userId).filter(order => order.);
    // if (!isProductReceived || isProductReceived.dateReturned === null) {
    //   return {
    //     error: errors.OPERATION_NOT_PERMITTED,
    //     result: null,
    //   };
    // }

    const review = await reviewsData.create(content, userId, productId, rating, title);

    return {
      error: null,
      result: review
    };
  };

const updateReview =
  (reviewsData: ReviewsData) =>
  async (
    content: string,
    reviewId: number,
    userId: number,
    role: RolesType,
    rating: number,
    title: string
  ) => {
    const existingReview = await reviewsData.getBy('review_id', reviewId, userId, role);

    if (!existingReview) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    // The user is not admin or has created the review
    if (existingReview.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    if (!content) {
      content = existingReview.content;
    }
    if (!title) {
      title = existingReview.title;
    }
    if (!rating) {
      rating = existingReview.rating;
    }

    const updated = {
      ...existingReview,
      content,
      date_edited: new Date().toLocaleDateString('en-US'),
      rating,
      title
    };

    await reviewsData.update(content, reviewId, userId, role, rating, title);

    return {
      error: null,
      result: updated
    };
  };

const deleteReview =
  (reviewsData: ReviewsData) =>
  async (reviewId: number, userId: number, role: RolesType) => {
    const existingReview = await reviewsData.getBy('review_id', reviewId);

    if (!existingReview) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    // The user is not admin or has created the review
    if (existingReview.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    await reviewsData.remove(reviewId, userId, role);

    return {
      error: null,
      result: { ...existingReview, isDeleted: true }
    };
  };

const voteReview =
  (reviewsData: ReviewsData) => async (reactionName: string, reviewId: number, userId: number) => {
    const existingReview = await reviewsData.getVoteBy('review_id', reviewId, userId);

    if (existingReview) {
      const result = await reviewsData.updateVote(reactionName, reviewId, userId);
      return {
        error: null,
        result
      };
    }

    const result = await reviewsData.createVote(reactionName, reviewId, userId);
    return {
      error: null,
      result
    };
  };

const unVoteReview =
  (reviewsData: ReviewsData) => async (reviewId: number, userId: number, role: RolesType) => {
    const existingReviewVote = await reviewsData.getVoteBy('review_id', reviewId, userId);

    if (!existingReviewVote) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }
    // The user is not admin or has created the review vote
    if (existingReviewVote.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    await reviewsData.removeVote(reviewId, userId);

    return {
      error: null,
      result: { message: `Vote was successfully removed.` }
    };
  };

export default {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  voteReview,
  unVoteReview,
  getReviewById
};
