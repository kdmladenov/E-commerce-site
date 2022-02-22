import {
  ANSWER_CREATE_FAIL,
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_RESET,
  ANSWER_CREATE_SUCCESS,
  ANSWER_DELETE_FAIL,
  ANSWER_DELETE_REQUEST,
  ANSWER_DELETE_SUCCESS,
  ANSWER_EDIT_FAIL,
  ANSWER_EDIT_REQUEST,
  ANSWER_EDIT_RESET,
  ANSWER_EDIT_SUCCESS,
  QUESTION_AND_ANSWERS_LIST_FAIL,
  QUESTION_AND_ANSWERS_LIST_REQUEST,
  QUESTION_AND_ANSWERS_LIST_SUCCESS,
  QUESTION_ASK_FAIL,
  QUESTION_ASK_REQUEST,
  QUESTION_ASK_RESET,
  QUESTION_ASK_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_EDIT_FAIL,
  QUESTION_EDIT_REQUEST,
  QUESTION_EDIT_RESET,
  QUESTION_EDIT_SUCCESS,
  QUESTION_VOTE_FAIL,
  QUESTION_VOTE_REQUEST,
  QUESTION_VOTE_SUCCESS
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

export const questionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true };
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const answerCreateReducer = (state = { answer: {} }, action) => {
  switch (action.type) {
    case ANSWER_CREATE_REQUEST:
      return { loading: true };
    case ANSWER_CREATE_SUCCESS:
      return { loading: false, success: true, answer: action.payload };
    case ANSWER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ANSWER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const answerEditReducer = (state = { answer: {} }, action) => {
  switch (action.type) {
    case ANSWER_EDIT_REQUEST:
      return { loading: true };
    case ANSWER_EDIT_SUCCESS:
      return { loading: false, success: true, answer: action.payload };
    case ANSWER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case ANSWER_EDIT_RESET:
      return { answer: {} };
    default:
      return state;
  }
};

export const answerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANSWER_DELETE_REQUEST:
      return { loading: true };
    case ANSWER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ANSWER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_VOTE_REQUEST:
      return { loading: true };
    case QUESTION_VOTE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_VOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
