import ReviewType from './ReviewType';
import VoteType from './VoteType';

interface ReviewsData {
  getAll: (
    productId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number,
    ratingMin: number,
    ratingMax: number
  ) => Promise<ReviewType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<ReviewType>;
  create: (
    content: string,
    userId: number,
    productId: number,
    rating: number,
    title: string
  ) => Promise<ReviewType>;
  update: (
    content: string,
    reviewId: number,
    userId: number,
    role: RolesType,
    rating: number,
    title: string
  ) => Promise<ReviewType>;
  remove: (reviewId: number, userId: number, role: RolesType) => Promise<any>;
  getReviewByUserAndProduct: (userId: number, productId: number) => Promise<ReviewType>;
  getVoteBy: (column: string, value: string | number, userId: number) => Promise<VoteType>;
  createVote: (reactionName: string, reviewId: number, userId: number) => Promise<VoteType>;
  updateVote: (reactionName: string, reviewId: number, userId: number) => Promise<VoteType>;
  removeVote: (reviewId: number, userId: number) => Promise<void>;
}

export default ReviewsData;
