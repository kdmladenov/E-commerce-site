import productCategoriesEnum from '../constants/product-categories.enum.js';
import { product as PRODUCT } from '../constants/constants.js';

export default {
  title: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= PRODUCT.MIN_NAME_LENGTH &&
      value.length <= PRODUCT.MAX_NAME_LENGTH),
  brand: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= PRODUCT.MIN_BRAND_LENGTH &&
      value.length <= PRODUCT.MAX_BRAND_LENGTH),
  image: (value) => !value || typeof value === 'string',
  product_category: (value) =>
    !value || (typeof value === 'string' && Object.keys(productCategoriesEnum).includes(value)),
  price: (value) =>
    !value ||
    (typeof value === 'number' &&
      value >= PRODUCT.MIN_PRICE_VALUE &&
      value <= PRODUCT.MAX_PRICE_VALUE),
  stock_count: (value) =>
    !value ||
    (typeof value === 'number' &&
      value >= PRODUCT.MIN_STOCK_COUNT &&
      value <= PRODUCT.MAX_STOCK_COUNT),
  review_count: (value) =>
    !value ||
    (typeof value === 'number' &&
      value >= PRODUCT.MIN_REVIEW_COUNT &&
      value <= PRODUCT.MAX_REVIEW_COUNT),
  rating: (value) =>
    !value ||
    (typeof value === 'number' &&
      value >= PRODUCT.MIN_RATING_VALUE &&
      value <= PRODUCT.MAX_REVIEW_COUNT)
};
