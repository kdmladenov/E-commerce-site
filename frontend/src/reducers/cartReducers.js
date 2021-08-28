import { CART_ADD_ITEM, CART_REMOVE_ALL_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === cartItem.id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => (item.id === existItem.id ? cartItem : item))
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem]
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload)
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      };
    case CART_REMOVE_ALL_ITEMS:
      return {
        ...state,
        cartItems: []
      };
    default:
      return state;
  }
};
