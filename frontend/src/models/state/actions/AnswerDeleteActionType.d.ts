interface AnswerDeleteActionRequest {
  type: 'ANSWER_DELETE_REQUEST';
}
interface AnswerDeleteActionSuccess {
  type: 'ANSWER_DELETE_SUCCESS';
}
interface AnswerDeleteActionError {
  type: 'ANSWER_DELETE_FAIL';
  payload: string;
}

type AnswerDeleteActionType =
  | AnswerDeleteActionRequest
  | AnswerDeleteActionSuccess
  | AnswerDeleteActionError;

export default AnswerDeleteActionType;
