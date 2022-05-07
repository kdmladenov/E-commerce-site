interface QuestionDeleteActionRequest {
  type: 'QUESTION_DELETE_REQUEST';
}
interface QuestionDeleteActionSuccess {
  type: 'QUESTION_DELETE_SUCCESS';
}
interface QuestionDeleteActionError {
  type: 'QUESTION_DELETE_FAIL';
  payload: string;
}

type QuestionDeleteActionType =
  | QuestionDeleteActionRequest
  | QuestionDeleteActionSuccess
  | QuestionDeleteActionError;

export default QuestionDeleteActionType;
