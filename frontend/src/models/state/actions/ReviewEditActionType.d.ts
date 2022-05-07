import ReviewType from '../../ReviewType';

interface ReviewEditActionRequest {
  type: 'REVIEW_EDIT_REQUEST';
}
interface ReviewEditActionSuccess {
  type: 'REVIEW_EDIT_SUCCESS';
  payload?: ReviewType;
}
interface ReviewEditActionError {
  type: 'REVIEW_EDIT_FAIL';
  payload: string;
}
interface ReviewEditActionReset {
  type: 'REVIEW_EDIT_RESET';
}

type ReviewEditActionType =
  | ReviewEditActionRequest
  | ReviewEditActionSuccess
  | ReviewEditActionError
  | ReviewEditActionReset;

export default ReviewEditActionType;
