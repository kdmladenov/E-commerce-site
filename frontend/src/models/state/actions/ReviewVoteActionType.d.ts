interface ReviewVoteActionRequest {
  type: 'REVIEW_VOTE_REQUEST';
}

interface ReviewVoteActionSuccess {
  type: 'REVIEW_VOTE_SUCCESS';
}
interface ReviewVoteActionError {
  type: 'REVIEW_VOTE_FAIL';
  payload: string;
}

type ReviewVoteActionType =
  | ReviewVoteActionRequest
  | ReviewVoteActionSuccess
  | ReviewVoteActionError;

export default ReviewVoteActionType;
