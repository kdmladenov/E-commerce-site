import axios from 'axios';

import { BASE_URL } from '../../constants/constants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${BASE_URL}/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${BASE_URL}/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.put(`${BASE_URL}/orders/${order.orderId}/deliver`, {}, config);

    dispatch({
      type: ORDER_DELIVER_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listMyOrders =
  (endpoint = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_MY_LIST_REQUEST
      });
      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/orders/myorders?${endpoint}`, config);

      dispatch({
        type: ORDER_MY_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_MY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const listOrders = (endpoint = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    });
    // access to the logged in user info
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${BASE_URL}/orders?${endpoint}`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
