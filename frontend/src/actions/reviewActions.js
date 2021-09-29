import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS
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

export const listReviews = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/reviews/${productId}`);

    dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
