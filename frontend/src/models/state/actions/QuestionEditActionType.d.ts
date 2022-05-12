import QuestionType from '../../QuestionType';

interface QuestionEditActionRequest {
  type: 'QUESTION_EDIT_REQUEST';
}

interface QuestionEditActionSuccess {
  type: 'QUESTION_EDIT_SUCCESS';
  payload?: QuestionType;
}
interface QuestionEditActionError {
  type: 'QUESTION_EDIT_FAIL';
  payload: string;
}
interface QuestionEditActionReset {
  type: 'QUESTION_EDIT_RESET';
}

type QuestionEditActionType =
  | QuestionEditActionRequest
  | QuestionEditActionSuccess
  | QuestionEditActionError
  | QuestionEditActionReset;

export default QuestionEditActionType;
