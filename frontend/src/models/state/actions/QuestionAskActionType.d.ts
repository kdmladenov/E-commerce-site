import QuestionType from '../../QuestionType';

interface QuestionAskActionRequest {
  type: 'QUESTION_ASK_REQUEST';
}

interface QuestionAskActionSuccess {
  type: 'QUESTION_ASK_SUCCESS';
  payload: QuestionType;
}
interface QuestionAskActionError {
  type: 'QUESTION_ASK_FAIL';
  payload: string;
}
interface QuestionAskActionReset {
  type: 'QUESTION_ASK_RESET';
}

type QuestionAskActionType =
  | QuestionAskActionRequest
  | QuestionAskActionSuccess
  | QuestionAskActionError
  | QuestionAskActionReset;

export default QuestionAskActionType;
