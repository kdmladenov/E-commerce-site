import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {
  QUESTION_AND_ANSWERS_LIST_FAIL,
  QUESTION_AND_ANSWERS_LIST_REQUEST,
  QUESTION_AND_ANSWERS_LIST_SUCCESS,
  QUESTION_ASK_FAIL,
  QUESTION_ASK_REQUEST,
  QUESTION_ASK_SUCCESS,
  QUESTION_EDIT_FAIL,
  QUESTION_EDIT_REQUEST,
  QUESTION_EDIT_SUCCESS
} from '../constants/questionsAndAnswersConstants';

export const askQuestion = (productId, question) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_ASK_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${BASE_URL}/questions/${productId}`, question, config);

    dispatch({ type: QUESTION_ASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUESTION_ASK_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listQuestionsAndAnswers = (productId) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_AND_ANSWERS_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/questions/${productId}`);

    dispatch({ type: QUESTION_AND_ANSWERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUESTION_AND_ANSWERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const editQuestions = (questionId, update) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_EDIT_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.put(`${BASE_URL}/questions/${questionId}`, update, config);

    dispatch({ type: QUESTION_EDIT_SUCCESS });
  } catch (error) {
    dispatch({
      type: QUESTION_EDIT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};