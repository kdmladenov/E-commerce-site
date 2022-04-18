import productCategoriesEnum from '../constants/product-categories.enum.js';
import { product as PRODUCT } from '../constants/constants.js';

export default {
  title: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_NAME_LENGTH &&
    value.length <= PRODUCT.MAX_NAME_LENGTH,
  brand: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_BRAND_LENGTH &&
    value.length <= PRODUCT.MAX_BRAND_LENGTH,
  description: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_DESCRIPTION_LENGTH &&
    value.length <= PRODUCT.MAX_DESCRIPTION_LENGTH,
  image: (value: string) => !value || typeof value === 'string',
  productCategory: (value: string) =>
    typeof value === 'string' && Object.keys(productCategoriesEnum).includes(value),
  price: (value: number) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_PRICE_VALUE &&
    value <= PRODUCT.MAX_PRICE_VALUE,
  stockCount: (value: number) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_STOCK_COUNT &&
    value <= PRODUCT.MAX_STOCK_COUNT,
  discount: (value: number) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_DISCOUNT_VALUE &&
    value <= PRODUCT.MAX_DISCOUNT_VALUE,
  isDeleted: (value: boolean) => !value || typeof value === 'boolean',
  modelNumber: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_MODEL_NUMBER_LENGTH &&
    value.length <= PRODUCT.MAX_MODEL_NUMBER_LENGTH,
  sku: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_SKU_LENGTH &&
    value.length <= PRODUCT.MAX_SKU_LENGTH,
  releaseYear: (value: number) =>
    typeof +value === 'number' &&
    value >= PRODUCT.MIN_RELEASE_YEAR &&
    value <= PRODUCT.MAX_RELEASE_YEAR,
  color: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_COLOR_LENGTH &&
    value.length <= PRODUCT.MAX_COLOR_LENGTH,
  colorFamily: (value: string) =>
    typeof value === 'string' &&
    value.length >= PRODUCT.MIN_COLOR_FAMILY_LENGTH &&
    value.length <= PRODUCT.MAX_COLOR_FAMILY_LENGTH,
  dimensions: (value: string) => typeof value === 'string' && PRODUCT.DIMENSIONS_REGEX.test(value),
  weight: (value: number) =>
    typeof +value === 'number' && value >= PRODUCT.MIN_WEIGHT && value <= PRODUCT.MAX_WEIGHT
};
