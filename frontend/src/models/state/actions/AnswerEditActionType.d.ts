import AnswerType from '../../AnswerType';

interface AnswerEditActionRequest {
  type: 'ANSWER_EDIT_REQUEST';
}

interface AnswerEditActionSuccess {
  type: 'ANSWER_EDIT_SUCCESS';
  payload: AnswerType;
}
interface AnswerEditActionError {
  type: 'ANSWER_EDIT_FAIL';
  payload: string;
}
interface AnswerEditActionReset {
  type: 'ANSWER_EDIT_RESET';
}

type AnswerEditActionType =
  | AnswerEditActionRequest
  | AnswerEditActionSuccess
  | AnswerEditActionError
  | AnswerEditActionReset;

export default AnswerEditActionType;
