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
import { BASE_URL } from '../../constants/constants';
import StateType from '../../models/state/StateType';
import { Dispatch } from 'redux';
import BrowsingHistoryAddActionType from '../../models/state/actions/BrowsingHistoryAddActionType';
import BrowsingHistoryListActionType from '../../models/state/actions/BrowsingHistoryListActionType';
import BrowsingHistoryDeleteActionType from '../../models/state/actions/BrowsingHistoryDeleteActionType';

export const addBrowsingHistoryRecord =
  (productId: number) =>
  async (dispatch: Dispatch<BrowsingHistoryAddActionType>, getState: () => StateType) => {
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

      // for Sidebar input map
      const { data } = await axios.get(
        `${BASE_URL}/history?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allMyHistory', JSON.stringify(data));

      dispatch({ type: BROWSING_HISTORY_ADD_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: BROWSING_HISTORY_ADD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listBrowsingHistory =
  (endpoint: string = '') =>
  async (dispatch: Dispatch<BrowsingHistoryListActionType>, getState: () => StateType) => {
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
      const { data } = await axios.get(`${BASE_URL}/history?${endpoint}`, config);

      dispatch({
        type: BROWSING_HISTORY_LIST_SUCCESS,
        payload: data
      });

      // if no history in localstorage, add it
      data.length > 0 &&
        !JSON.parse(localStorage.getItem('allMyHistory')!)?.length &&
        localStorage.setItem('allMyHistory', JSON.stringify(data));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: BROWSING_HISTORY_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deleteBrowsingHistory =
  (productId: number) =>
  async (dispatch: Dispatch<BrowsingHistoryDeleteActionType>, getState: () => StateType) => {
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

      await axios.delete(`${BASE_URL}/history/${productId}`, config);

      // for Sidebar input map
      const { data } = await axios.get(
        `${BASE_URL}/history?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allMyHistory', JSON.stringify(data));

      dispatch({
        type: BROWSING_HISTORY_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: BROWSING_HISTORY_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
