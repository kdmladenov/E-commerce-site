/* eslint-disable no-param-reassign */
import errors from '../constants/service-errors.js';

const getAllReviews = (reviewsData, productsData) => async (productId, order, page, pageSize) => {
  const existingProduct = await productsData.getBy('product_id', productId);

  if (!existingProduct) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  const reviews = await reviewsData.getAll(productId, order, page, pageSize);

  return {
    error: null,
    result: reviews,
  };
};

const createReview = (productsData, reviewsData
  // , ordersData, usersData
  ) => async (content, userId, productId, rating, title) => {
  // checks if the product exists
  const existingProduct = await productsData.getBy('product_id', productId);
  if (!existingProduct) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  // checks if the user has already made a review for the same product
  const existingReview = await reviewsData.getReviewByUserAndProduct(userId, productId);
  if (existingReview) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null,
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
    result: review,
  };
};

const updateReview = reviewsData => async (content, reviewId, userId, role, rating, title) => {

  const existingReview = await reviewsData.getBy('review_id', reviewId, userId, role);

  if (!existingReview) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null,
    };
  }

  if (!content) { content = existingReview.content }
  if (!title) {title = existingReview.title}
  if (!rating) {rating = existingReview.rating}

  const updated = {
    ...existingReview, content, date_edited: new Date().toLocaleDateString('en-US'), rating, title,
  };

  await reviewsData.update(content, reviewId, userId, role, rating, title);

  return {
    error: null,
    result: updated,
  };
};

// const deleteReview = (reviewsData, usersData) => async (reviewId, userId, role) => {
//   const existingReview = await reviewsData.getBy('review_id', reviewId, userId, role);

//   if (!existingReview) {
//     return {
//       error: errors.RECORD_NOT_FOUND,
//       result: null,
//     };
//   }

//   const p = await usersData.updatePoints(+existingReview.userId, readingPoints.DELETE_REVIEW);
//   const r = await reviewsData.remove(reviewId, userId, role);

//   return {
//     error: null,
//     result: existingReview,
//   };
// };

// const voteReview = reviewVoteData => async (reactionName, reviewId, userId, role) => {
//   const existingReview = await reviewVoteData.getBy('review_id', reviewId, userId, role);

//   if (existingReview) {
//     const result = await reviewVoteData.update(reactionName, reviewId, userId, role);
//     return {
//       error: null,
//       result,
//     };
//   }

//   const result = await reviewVoteData.create(reactionName, reviewId, userId, role);
//   return {
//     error: null,
//     result,
//   };
// };

// const unVoteReview = reviewVoteData => async (reviewId, userId, role) => {
//   const existingReview = await reviewVoteData.getBy('review_id', reviewId, userId, role);

//   if (!existingReview) {
//     return {
//       error: errors.RECORD_NOT_FOUND,
//       result: null,
//     };
//   }

//   const _ = await reviewVoteData.remove(reviewId, userId);
//   return {
//     error: null,
//     result: { message: `Vote was successfully removed.` },
//   };
// };

// const readReview = reviewsData => async (reviewId, userId, role) => {
//   // checks if the review exists
//   const existingReview = await reviewsData.getBy('review_id', reviewId, userId, role);

//   if (!existingReview) {
//     return {
//       error: errors.RECORD_NOT_FOUND,
//       result: null,
//     };
//   }

//   return {
//     error: null,
//     result: existingReview,
//   };
// };

export default {
  getAllReviews,
  createReview,
  updateReview,
  // deleteReview,
  // voteReview,
  // unVoteReview,
  // readReview,
};
