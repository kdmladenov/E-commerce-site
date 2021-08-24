import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';
import { BASE_URL } from '../constants/constants';

export const addToCart = (id, qty) => async (dispatch, getState) => {

  const { data } = await axios.get(`${BASE_URL}/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      qty,
      id: data.productId,
      title: data.title,
      image: data.image,
      price: data.price,
      stockCount: data.stockCount
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};