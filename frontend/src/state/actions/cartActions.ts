import axios from 'axios';

import {
  CART_ADD_ITEM,
  CART_ITEM_UPDATE_QTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';
import { BASE_URL } from '../../constants/constants';
import CartItemType from '../../models/CartItemType';
import AddressType from '../../models/AddressType';
import StateType from '../../models/state/StateType';
import { Dispatch } from 'redux';
import CartActionType from '../../models/state/actions/CartActionType';

export const addToCart =
  (productId: number, qty: number) =>
  async (dispatch: Dispatch<CartActionType>, getState: () => StateType) => {
    const { data } = await axios.get(`${BASE_URL}/products/${productId}`);
    const { title, image, price, stockCount, rating, reviewCount } = data;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        qty,
        productId,
        title,
        image,
        price,
        stockCount,
        rating,
        reviewCount
      }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

export const updateCartItemQty =
  (item: CartItemType, qty: number) =>
  async (dispatch: Dispatch<CartActionType>, getState: () => StateType) => {
    dispatch({
      type: CART_ITEM_UPDATE_QTY,
      payload: {
        ...item,
        qty
      }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

export const removeFromCart =
  (productId: number) => async (dispatch: Dispatch<CartActionType>, getState: () => StateType) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

export const saveShippingAddress =
  (data: AddressType) => async (dispatch: Dispatch<CartActionType>) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

export const savePaymentMethod = (data: string) => async (dispatch: Dispatch<CartActionType>) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
