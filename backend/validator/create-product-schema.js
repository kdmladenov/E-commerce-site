import productCategoriesEnum from '../constants/product-categories.enum.js';
import { product as PRODUCT } from '../constants/constants.js';

export default {
  title: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_NAME_LENGTH &&
    value.length <= PRODUCT.MAX_NAME_LENGTH,
  brand: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_BRAND_LENGTH &&
    value.length <= PRODUCT.MAX_BRAND_LENGTH,
  description: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_DESCRIPTION_LENGTH &&
    value.length <= PRODUCT.MAX_DESCRIPTION_LENGTH,
  image: (value) => typeof value === 'string',
  productCategory: (value) =>
    typeof value === 'string' && Object.keys(productCategoriesEnum).includes(value),
  price: (value) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_PRICE_VALUE &&
    value <= PRODUCT.MAX_PRICE_VALUE,
  stockCount: (value) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_STOCK_COUNT &&
    value <= PRODUCT.MAX_STOCK_COUNT,
  discount: (value) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_DISCOUNT_VALUE &&
    value <= PRODUCT.MAX_DISCOUNT_VALUE,
  isDeleted: (value) => typeof value === 'boolean',
  modelNumber: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_MODEL_NUMBER_LENGTH &&
    value.length <= PRODUCT.MAX_MODEL_NUMBER_LENGTH,
  sku: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_SKU_LENGTH &&
    value.length <= PRODUCT.MAX_SKU_LENGTH,
  releaseYear: (value) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_RELEASE_YEAR &&
    value <= PRODUCT.MAX_RELEASE_YEAR,
  color: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_COLOR_LENGTH &&
    value.length <= PRODUCT.MAX_COLOR_LENGTH,
  colorFamily: (value) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_COLOR_FAMILY_LENGTH &&
    value.length <= PRODUCT.MAX_COLOR_FAMILY_LENGTH,
  dimensions: (value) => typeof value === 'string' && PRODUCT.DIMENSIONS_REGEX.test(value),
  weight: (value) =>
    typeof +value === 'number' && value >= PRODUCT.MIN_WEIGHT && value <= PRODUCT.MAX_WEIGHT
};
