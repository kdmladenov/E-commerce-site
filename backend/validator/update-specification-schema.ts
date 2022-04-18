import productCategoriesEnum from '../constants/product-categories.enum.js';
import { product as PRODUCT } from '../constants/constants.js';

export default {
  title: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= PRODUCT.MIN_NAME_LENGTH &&
      value.length <= PRODUCT.MAX_NAME_LENGTH),
  brand: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= PRODUCT.MIN_BRAND_LENGTH &&
      value.length <= PRODUCT.MAX_BRAND_LENGTH),
  description: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_DESCRIPTION_LENGTH &&
    value.length <= PRODUCT.MAX_DESCRIPTION_LENGTH,
  image: (value: string) => !value || typeof value === 'string',
  product_category: (value: string) =>
    !value || (typeof value === 'string' && Object.keys(productCategoriesEnum).includes(value)),
  price: (value: number) =>
    !value ||
    (typeof value === 'number' &&
      value >= PRODUCT.MIN_PRICE_VALUE &&
      value <= PRODUCT.MAX_PRICE_VALUE),
  stock_count: (value: number) =>
    !value ||
    (typeof value === 'number' &&
      value >= PRODUCT.MIN_STOCK_COUNT &&
      value <= PRODUCT.MAX_STOCK_COUNT),
  discount: (value: number) =>
    typeof value === 'number' &&
    value >= PRODUCT.MIN_DISCOUNT_VALUE &&
    value <= PRODUCT.MAX_DISCOUNT_VALUE
};
