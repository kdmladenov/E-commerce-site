import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {
  ANSWER_CREATE_FAIL,
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_SUCCESS,
  ANSWER_DELETE_FAIL,
  ANSWER_DELETE_REQUEST,
  ANSWER_DELETE_SUCCESS,
  ANSWER_EDIT_FAIL,
  ANSWER_EDIT_REQUEST,
  ANSWER_EDIT_SUCCESS,
  QUESTION_AND_ANSWERS_LIST_FAIL,
  QUESTION_AND_ANSWERS_LIST_REQUEST,
  QUESTION_AND_ANSWERS_LIST_SUCCESS,
  QUESTION_ASK_FAIL,
  QUESTION_ASK_REQUEST,
  QUESTION_ASK_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_EDIT_FAIL,
  QUESTION_EDIT_REQUEST,
  QUESTION_EDIT_SUCCESS,
  QUESTION_VOTE_FAIL,
  QUESTION_VOTE_REQUEST,
  QUESTION_VOTE_SUCCESS
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

export const listQuestionsAndAnswers =
  (productId, endpoint = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: QUESTION_AND_ANSWERS_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/questions/${productId}?${endpoint}`);

      dispatch({ type: QUESTION_AND_ANSWERS_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: QUESTION_AND_ANSWERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const editQuestion = (questionId, update) => async (dispatch, getState) => {
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

export const deleteQuestion = (questionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${BASE_URL}/questions/${questionId}`, config);

    dispatch({ type: QUESTION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: QUESTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const createAnswer = (questionId, answer) => async (dispatch, getState) => {
  try {
    dispatch({ type: ANSWER_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${BASE_URL}/answers/${questionId}`, answer, config);

    dispatch({ type: ANSWER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ANSWER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const editAnswer = (answerId, update) => async (dispatch, getState) => {
  try {
    dispatch({ type: ANSWER_EDIT_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.put(`${BASE_URL}/answers/${answerId}`, update, config);

    dispatch({ type: ANSWER_EDIT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ANSWER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const deleteAnswer = (answerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ANSWER_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${BASE_URL}/answers/${answerId}`, config);

    dispatch({ type: ANSWER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ANSWER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const voteQuestion = (questionId, method, reaction) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_VOTE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const body = { reactionName: reaction };

    method === 'POST'
      ? await axios.post(`${BASE_URL}/questions/${questionId}/votes`, body, config)
      : await axios.delete(`${BASE_URL}/questions/${questionId}/votes`, config);

    dispatch({ type: QUESTION_VOTE_SUCCESS });
  } catch (error) {
    dispatch({
      type: QUESTION_VOTE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
