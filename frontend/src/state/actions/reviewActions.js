import axios from 'axios';

import { BASE_URL } from '../../constants/constants';
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

export const createReview = (productId, review) => async (dispatch, getState) => {
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
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const deleteReview = (reviewId) => async (dispatch, getState) => {
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
    dispatch({
      type: REVIEW_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listReviews = (productId, endpoint='') => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/reviews/${productId}?${endpoint}`);

    dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const editReview = (reviewId, update) => async (dispatch, getState) => {
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
    dispatch({
      type: REVIEW_EDIT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const voteReview = (reviewId, method, reaction) => async (dispatch, getState) => {
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
    dispatch({
      type: REVIEW_VOTE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
