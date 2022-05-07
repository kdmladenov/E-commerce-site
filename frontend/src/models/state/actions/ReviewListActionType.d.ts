import ReviewType from '../../ReviewType';

interface ReviewListActionRequest {
  type: 'REVIEW_LIST_REQUEST';
}

interface ReviewListActionSuccess {
  type: 'REVIEW_LIST_SUCCESS';
  payload: ReviewType[];
}
interface ReviewListActionError {
  type: 'REVIEW_LIST_FAIL';
  payload: string;
}

type ReviewListActionType =
  | ReviewListActionRequest
  | ReviewListActionSuccess
  | ReviewListActionError;

export default ReviewListActionType;
