interface ReviewDeleteActionRequest {
  type: 'REVIEW_DELETE_REQUEST';
}
interface ReviewDeleteActionSuccess {
  type: 'REVIEW_DELETE_SUCCESS';
}
interface ReviewDeleteActionError {
  type: 'REVIEW_DELETE_FAIL';
  payload: string;
}

type ReviewDeleteActionType =
  | ReviewDeleteActionRequest
  | ReviewDeleteActionSuccess
  | ReviewDeleteActionError;

export default ReviewDeleteActionType;
