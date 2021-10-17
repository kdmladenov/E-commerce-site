import { QUESTION_CREATE_FAIL, QUESTION_CREATE_REQUEST, QUESTION_CREATE_SUCCESS } from '../constants/questionsAndAnswersConstants';
import { REVIEW_CREATE_RESET } from '../constants/reviewConstants';

export const questionCreateReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true };
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
