import {
  CART_ADD_ITEM,
  CART_ITEM_UPDATE_QTY,
  CART_REMOVE_ALL_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItem = action.payload;
      const existItem = state.cartItems.find((item) => item.productId === cartItem.productId);
      if (existItem) {
        const cartItemUpdatedQty = { ...cartItem, qty: existItem.qty + cartItem.qty };
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === existItem.productId ? cartItemUpdatedQty : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem]
        };
      }
    case CART_ITEM_UPDATE_QTY:
      const updatedItem = action.payload;
      if (updatedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === updatedItem.productId ? updatedItem : item
          )
        };
      } else {
        return {
          ...state
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.productId !== action.payload)
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
