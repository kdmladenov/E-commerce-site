import { order as ORDER } from '../constants/constants.js';

export default {
  // title: (value) =>
  //   typeof value === 'string' &&
  //   value.length >= PRODUCT.MIN_NAME_LENGTH &&
  //   value.length <= PRODUCT.MAX_NAME_LENGTH,
  // brand: (value) =>
  //   typeof value === 'string' &&
  //   value.length >= PRODUCT.MIN_BRAND_LENGTH &&
  //   value.length <= PRODUCT.MAX_BRAND_LENGTH,
  // product_category: (value) =>
  //   typeof value === 'string' && Object.keys(productCategoriesEnum).includes(value),
  // price: (value) =>
  //   typeof value === 'number' &&
  //   value >= PRODUCT.MIN_PRICE_VALUE &&
  //   value <= PRODUCT.MAX_PRICE_VALUE,
  // stock_count: (value) =>
  //   typeof value === 'number' &&
  //   value >= PRODUCT.MIN_STOCK_COUNT &&
  //   value <= PRODUCT.MAX_STOCK_COUNT,
  // review_count: (value) =>
  //   typeof value === 'number' &&
  //   value >= PRODUCT.MIN_REVIEW_COUNT &&
  //   value <= PRODUCT.MAX_REVIEW_COUNT,
  orderItems: (value) =>
    Array.isArray(value) &&
    value.filter((item) => typeof item !== 'string' || item === '').length === 0,
  shippingAddress: (value) =>
    Object.prototype.toString.call(value) === '[object Object]' &&
    Object.values(value).filter((item) => typeof item !== 'string' || item === '').length === 0,
  paymentMethod: (value) => typeof value === 'string' && ORDER.PAYMENT_METHOD.includes(value),
  itemsPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_ITEM_PRICE,
  taxPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_TAX_PRICE,
  shippingPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_SHIPPING_PRICE,
  totalPrice: (value) => typeof value === 'number' && value >= ORDER.MIN_TOTAL_PRICE
};
