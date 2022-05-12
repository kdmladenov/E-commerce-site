interface QuestionVoteActionRequest {
  type: 'QUESTION_VOTE_REQUEST';
}

interface QuestionVoteActionSuccess {
  type: 'QUESTION_VOTE_SUCCESS';
}
interface QuestionVoteActionError {
  type: 'QUESTION_VOTE_FAIL';
  payload: string;
}

type QuestionVoteActionType =
  | QuestionVoteActionRequest
  | QuestionVoteActionSuccess
  | QuestionVoteActionError;

export default QuestionVoteActionType;
