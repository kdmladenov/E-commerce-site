import AnswerType from '../../AnswerType';

interface AnswerCreateActionRequest {
  type: 'ANSWER_CREATE_REQUEST';
}

interface AnswerCreateActionSuccess {
  type: 'ANSWER_CREATE_SUCCESS';
  payload: AnswerType;
}
interface AnswerCreateActionError {
  type: 'ANSWER_CREATE_FAIL';
  payload: string;
}
interface AnswerCreateActionReset {
  type: 'ANSWER_CREATE_RESET';
}

type AnswerCreateActionType =
  | AnswerCreateActionRequest
  | AnswerCreateActionSuccess
  | AnswerCreateActionError
  | AnswerCreateActionReset;

export default AnswerCreateActionType;
