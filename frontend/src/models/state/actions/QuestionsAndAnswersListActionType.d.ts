import QuestionType from '../../QuestionType';

interface QuestionsAndAnswersListActionRequest {
  type: 'QUESTION_AND_ANSWERS_LIST_REQUEST';
}

interface QuestionsAndAnswersListActionSuccess {
  type: 'QUESTION_AND_ANSWERS_LIST_SUCCESS';
  payload: QuestionType[];
}
interface QuestionsAndAnswersListActionError {
  type: 'QUESTION_AND_ANSWERS_LIST_FAIL';
  payload: string;
}

type QuestionsAndAnswersListActionType =
  | QuestionsAndAnswersListActionRequest
  | QuestionsAndAnswersListActionSuccess
  | QuestionsAndAnswersListActionError;

export default QuestionsAndAnswersListActionType;
