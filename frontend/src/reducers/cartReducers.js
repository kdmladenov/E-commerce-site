import { CART_ITEM_ADD } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ITEM_ADD:
      const cartItem = action.payload;
      const existItem = state.cartItems.findIndex((item) => item.id === cartItem.id);
      if (existItem !== -1) {
        return {
          ...state,
          cart: state.cartItems.map((item) => (item.id === existItem.id ? cartItem : item))
        };
      } else {
        return {
          ...state,
          cart: [...state.cartItems, cartItem]
        };
      }
    default:
      return state;
  }
};
