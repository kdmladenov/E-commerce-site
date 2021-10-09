import axios from 'axios';
import {
  BROWSING_HISTORY_ADD_FAIL,
  BROWSING_HISTORY_ADD_REQUEST,
  BROWSING_HISTORY_ADD_SUCCESS,
  BROWSING_HISTORY_DELETE_FAIL,
  BROWSING_HISTORY_DELETE_REQUEST,
  BROWSING_HISTORY_DELETE_SUCCESS,
  BROWSING_HISTORY_LIST_FAIL,
  BROWSING_HISTORY_LIST_REQUEST,
  BROWSING_HISTORY_LIST_SUCCESS
} from '../constants/browsingHistoryConstants';
import { BASE_URL } from '../constants/constants';

export const addBrowsingHistoryRecord = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BROWSING_HISTORY_ADD_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`${BASE_URL}/history/${productId}`, {}, config);

    dispatch({ type: BROWSING_HISTORY_ADD_SUCCESS });
  } catch (error) {
    dispatch({
      type: BROWSING_HISTORY_ADD_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listBrowsingHistory =
  (endpoint = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: BROWSING_HISTORY_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data } = await axios.get(`${BASE_URL}/history${endpoint}`, config);

      dispatch({
        type: BROWSING_HISTORY_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: BROWSING_HISTORY_LIST_FAIL,
        payload: error?.response?.data?.message ? error.response.data.message : error.message
      });
    }
  };

export const deleteBrowsingHistory = (historyId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BROWSING_HISTORY_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${BASE_URL}/history/${historyId}`, config);

    dispatch({
      type: BROWSING_HISTORY_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: BROWSING_HISTORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
