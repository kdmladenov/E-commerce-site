import axios from 'axios';
import { CART_ITEM_ADD } from '../constants/cartConstants';

export const listProducts = (id, qty) => async (dispatch) => {
  const { data } = await axios.get(`/products/:productId`);

  dispatch({
    type: CART_ITEM_ADD,
    payload:{
      qty,
      id: data.productId,
      title: data.title,
      image: data.image,
      price: data.price,
      stockCount: data.stockCount
    }
  })

  // returns the whole cart state after the dispatched(added) item above
  const cartState = getState().cart;

  localStorage.setItem('cartItem', JSON.stringify(cartState.cartItems))
};


 "productId": 2,
    "title": "Apple AirPods with Wireless Charging Case\n",
    "brand": "Apple",
    "description": "Universal fit that’s comfortable all day Automatically on, automatically connected Easy setup for all your Apple devices Quick access to Siri by saying “Hey Siri” Seamless switching between devices",
    "image": "https://images-na.ssl-images-amazon.com/images/I/31gVyQCvdTL.jpg",
    "productCategory": "Electonics",
    "price": 299.95,
    "stockCount": 4345,
    "reviewCount": 1,
    "rating": 3.9