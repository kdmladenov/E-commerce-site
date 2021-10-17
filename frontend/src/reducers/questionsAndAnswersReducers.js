import {
  QUESTION_AND_ANSWERS_LIST_FAIL,
  QUESTION_AND_ANSWERS_LIST_REQUEST,
  QUESTION_AND_ANSWERS_LIST_SUCCESS,
  QUESTION_ASK_FAIL,
  QUESTION_ASK_REQUEST,
  QUESTION_ASK_RESET,
  QUESTION_ASK_SUCCESS,
  QUESTION_EDIT_FAIL,
  QUESTION_EDIT_REQUEST,
  QUESTION_EDIT_RESET,
  QUESTION_EDIT_SUCCESS
} from '../constants/questionsAndAnswersConstants';

export const questionAskReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_ASK_REQUEST:
      return { loading: true };
    case QUESTION_ASK_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_ASK_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_ASK_RESET:
      return {};
    default:
      return state;
  }
};

export const questionsAndAnswersListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTION_AND_ANSWERS_LIST_REQUEST:
      return { loading: true };
    case QUESTION_AND_ANSWERS_LIST_SUCCESS:
      return { loading: false, questions: action.payload };
    case QUESTION_AND_ANSWERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const questionEditReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_EDIT_REQUEST:
      return { loading: true };
    case QUESTION_EDIT_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_EDIT_RESET:
      return { question: {} };
    default:
      return state;
  }
};