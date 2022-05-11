import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import WishListDeleteActionType from '../../models/state/actions/WishLisDeleteActionType';
import WishListItemsActionType from '../../models/state/actions/WishLisItemsActionType';
import WishListAddActionType from '../../models/state/actions/WishListAddActionType';
import StateType from '../../models/state/StateType';
import {
  WISH_ITEMS_LIST_FAIL,
  WISH_ITEMS_LIST_REQUEST,
  WISH_ITEMS_LIST_SUCCESS,
  WISH_LIST_ADD_FAIL,
  WISH_LIST_ADD_REQUEST,
  WISH_LIST_ADD_SUCCESS,
  WISH_LIST_DELETE_FAIL,
  WISH_LIST_DELETE_REQUEST,
  WISH_LIST_DELETE_SUCCESS
} from '../constants/wishListConstants';

export const addWishToList =
  (productId: number) =>
  async (dispatch: Dispatch<WishListAddActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: WISH_LIST_ADD_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.post(`${BASE_URL}/wishlist/${productId}`, {}, config);

      // for Sidebar input map
      const { data } = await axios.get(
        `${BASE_URL}/wishlist?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allMyWishList', JSON.stringify(data));

      dispatch({ type: WISH_LIST_ADD_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WISH_LIST_ADD_FAIL,
          payload: error.response?.data.message ? error.response.data.message : error.message
        });
    }
  };

export const listWishedItems =
  (endpoint = '') =>
  async (dispatch: Dispatch<WishListItemsActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: WISH_ITEMS_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data } = await axios.get(`${BASE_URL}/wishlist?${endpoint}`, config);

      dispatch({
        type: WISH_ITEMS_LIST_SUCCESS,
        payload: data
      });

      // if no wishlist in localstorage, add it
      data.length > 0 &&
        !JSON.parse(localStorage.getItem('allMyWishList')!)?.length &&
        localStorage.setItem('allMyWishList', JSON.stringify(data));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WISH_ITEMS_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deleteWishFromList =
  (productId: number) =>
  async (dispatch: Dispatch<WishListDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: WISH_LIST_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/wishlist/${productId}`, config);

      // for Sidebar input map
      const { data } = await axios.get(
        `${BASE_URL}/wishlist?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allMyWishList', JSON.stringify(data));

      dispatch({
        type: WISH_LIST_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WISH_LIST_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
