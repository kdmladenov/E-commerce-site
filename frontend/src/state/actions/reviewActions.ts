import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import ReviewCreateActionType from '../../models/state/actions/ReviewCreateActionType';
import ReviewDeleteActionType from '../../models/state/actions/ReviewDeleteActionType';
import ReviewEditActionType from '../../models/state/actions/ReviewEditActionType';
import ReviewListActionType from '../../models/state/actions/ReviewListActionType';
import ReviewVoteActionType from '../../models/state/actions/ReviewVoteActionType';
import StateType from '../../models/state/StateType';
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_EDIT_FAIL,
  REVIEW_EDIT_REQUEST,
  REVIEW_EDIT_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_VOTE_FAIL,
  REVIEW_VOTE_REQUEST,
  REVIEW_VOTE_SUCCESS
} from '../constants/reviewConstants';

export const createReview =
  (productId?: number, review?: { content?: string; rating?: number; title?: string }) =>
  async (dispatch: Dispatch<ReviewCreateActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.post(`${BASE_URL}/reviews/${productId}`, review, config);

      dispatch({ type: REVIEW_CREATE_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REVIEW_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteReview =
  (reviewId?: number) =>
  async (dispatch: Dispatch<ReviewDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REVIEW_DELETE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/reviews/${reviewId}`, config);

      dispatch({ type: REVIEW_DELETE_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REVIEW_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listReviews =
  (productId: number, endpoint: string = '') =>
  async (dispatch: Dispatch<ReviewListActionType>) => {
    try {
      dispatch({ type: REVIEW_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/reviews/${productId}?${endpoint}`);

      dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REVIEW_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const editReview =
  (reviewId?: number, update?: { content?: string; rating?: number; title?: string }) =>
  async (dispatch: Dispatch<ReviewEditActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REVIEW_EDIT_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.put(`${BASE_URL}/reviews/${reviewId}`, update, config);

      dispatch({ type: REVIEW_EDIT_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REVIEW_EDIT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const voteReview =
  (reviewId: number, method: string, reaction: string) =>
  async (dispatch: Dispatch<ReviewVoteActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REVIEW_VOTE_REQUEST });

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
        ? await axios.post(`${BASE_URL}/reviews/${reviewId}/votes`, body, config)
        : await axios.delete(`${BASE_URL}/reviews/${reviewId}/votes`, config);

      dispatch({ type: REVIEW_VOTE_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REVIEW_VOTE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
