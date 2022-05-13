import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import AnswerType from '../../models/AnswerType';
import AnswerCreateActionType from '../../models/state/actions/AnswerCreateActionType';
import AnswerDeleteActionType from '../../models/state/actions/AnswerDeleteActionType';
import AnswerEditActionType from '../../models/state/actions/AnswerEditActionType';
import QuestionAskActionType from '../../models/state/actions/QuestionAskActionType';
import QuestionDeleteActionType from '../../models/state/actions/QuestionDeleteActionType';
import QuestionEditActionType from '../../models/state/actions/QuestionEditActionType';
import QuestionsAndAnswersListActionType from '../../models/state/actions/QuestionsAndAnswersListActionType';
import QuestionVoteActionType from '../../models/state/actions/QuestionVoteActionType';
import StateType from '../../models/state/StateType';
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

export const askQuestion =
  (productId: number, contentQuestion: string) =>
  async (dispatch: Dispatch<QuestionAskActionType>, getState: () => StateType) => {
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

      const { data } = await axios.post(
        `${BASE_URL}/questions/${productId}`,
        { contentQuestion },
        config
      );

      dispatch({ type: QUESTION_ASK_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: QUESTION_ASK_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listQuestionsAndAnswers =
  (productId: number, endpoint: string = '') =>
  async (dispatch: Dispatch<QuestionsAndAnswersListActionType>) => {
    try {
      dispatch({ type: QUESTION_AND_ANSWERS_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/questions/${productId}?${endpoint}`);

      dispatch({ type: QUESTION_AND_ANSWERS_LIST_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: QUESTION_AND_ANSWERS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const editQuestion =
  (questionId: number, update: string) =>
  async (dispatch: Dispatch<QuestionEditActionType>, getState: () => StateType) => {
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

      await axios.put(`${BASE_URL}/questions/${questionId}`, { update }, config);

      dispatch({ type: QUESTION_EDIT_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: QUESTION_EDIT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteQuestion =
  (questionId: number) =>
  async (dispatch: Dispatch<QuestionDeleteActionType>, getState: () => StateType) => {
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
      axios.isAxiosError(error) &&
        dispatch({
          type: QUESTION_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const createAnswer =
  (questionId: number, answer: AnswerType) =>
  async (dispatch: Dispatch<AnswerCreateActionType>, getState: () => StateType) => {
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

      const { data } = await axios.post(
        `${BASE_URL}/answers/${questionId}`,
        { contentAnswer: answer },
        config
      );

      dispatch({ type: ANSWER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: ANSWER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const editAnswer =
  (answerId: number, update: string) =>
  async (dispatch: Dispatch<AnswerEditActionType>, getState: () => StateType) => {
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

      const { data } = await axios.put(`${BASE_URL}/answers/${answerId}`, { update }, config);

      dispatch({ type: ANSWER_EDIT_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: ANSWER_EDIT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteAnswer =
  (answerId: number) =>
  async (dispatch: Dispatch<AnswerDeleteActionType>, getState: () => StateType) => {
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
      axios.isAxiosError(error) &&
        dispatch({
          type: ANSWER_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const voteQuestion =
  (questionId: number, method: string, reaction: string) =>
  async (dispatch: Dispatch<QuestionVoteActionType>, getState: () => StateType) => {
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
      axios.isAxiosError(error) &&
        dispatch({
          type: QUESTION_VOTE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
