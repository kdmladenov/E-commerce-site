import axios from 'axios';

import {
  CART_ADD_ITEM,
  CART_ITEM_UPDATE_QTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';
import { BASE_URL } from '../../constants/constants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${BASE_URL}/products/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      qty,
      productId: data.productId,
      title: data.title,
      image: data.image,
      price: data.price,
      stockCount: data.stockCount,
      rating: data.rating,
      reviewCount: data.reviewCount
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateCartItemQty = (item, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_ITEM_UPDATE_QTY,
    payload: {
      ...item,
      qty
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};