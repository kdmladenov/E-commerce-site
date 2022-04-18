interface ReviewsData {
  getAll: Function;
  getBy: Function;
  create: Function;
  update: Function;
  remove: Function;
  getReviewByUserAndProduct: Function;
  getVoteBy: Function;
  createVote: Function;
  updateVote: Function;
  removeVote: Function;
}

export default ReviewsData;
