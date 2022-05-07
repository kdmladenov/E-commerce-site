import ReviewType from '../../ReviewType';

interface ReviewCreateActionRequest {
  type: 'REVIEW_CREATE_REQUEST';
}

interface ReviewCreateActionSuccess {
  type: 'REVIEW_CREATE_SUCCESS';
  payload?: ReviewType;
}
interface ReviewCreateActionError {
  type: 'REVIEW_CREATE_FAIL';
  payload: string;
}
interface ReviewCreateActionReset {
  type: 'REVIEW_CREATE_RESET';
}

type ReviewCreateActionType =
  | ReviewCreateActionRequest
  | ReviewCreateActionSuccess
  | ReviewCreateActionError
  | ReviewCreateActionReset;

export default ReviewCreateActionType;
