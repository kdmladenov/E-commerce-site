import { order as ORDER } from '../constants/constants.js';

export default {

  // orderItems: (value) =>
  //   Array.isArray(value) &&
  //   value.filter((item) => typeof item !== 'string' || item === '').length === 0,
  // shippingAddress: (value) =>
  //   Object.prototype.toString.call(value) === '[object Object]' &&
  //   Object.values(value).filter((item) => typeof item !== 'string' || item === '').length === 0,
  // paymentMethod: (value) => typeof value === 'string' && ORDER.PAYMENT_METHOD.includes(value),
  // itemsPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_ITEM_PRICE,
  // taxPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_TAX_PRICE,
  // shippingPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_SHIPPING_PRICE,
  // totalPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_TOTAL_PRICE
};
