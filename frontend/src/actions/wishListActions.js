import axios from 'axios';
import { BASE_URL } from '../constants/constants';
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

export const addWishToList = (productId) => async (dispatch, getState) => {
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

    dispatch({ type: WISH_LIST_ADD_SUCCESS });
    
    // for Sidebar input map
    const { data } = await axios.get(
      `${BASE_URL}/wishlist?pageSize=${localStorage.getItem('totalProductCount')}`,
      config
    );
    localStorage.setItem('allMyWishList', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: WISH_LIST_ADD_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listWishedItems =
  (endpoint = '') =>
  async (dispatch, getState) => {
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
        !JSON.parse(localStorage.getItem('allMyWishList'))?.length &&
        localStorage.setItem('allMyWishList', JSON.stringify(data));

    } catch (error) {
      dispatch({
        type: WISH_ITEMS_LIST_FAIL,
        payload: error?.response?.data?.message ? error.response.data.message : error.message
      });
    }
  };

export const deleteWishFromList = (productId) => async (dispatch, getState) => {
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

    dispatch({
      type: WISH_LIST_DELETE_SUCCESS
    });
    // for Sidebar input map
    const { data } = await axios.get(
      `${BASE_URL}/wishlist?pageSize=${localStorage.getItem('totalProductCount')}`,
      config
    );
    localStorage.setItem('allMyWishList', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: WISH_LIST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
