import { PRODUCT } from '../constants/constants.js';
import productCategoriesEnum from '../constants/product-categories.enum.js';

const validate = {
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

const validateInputProduct = {
  title: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.title(value)) {
      return ` must be between ${PRODUCT.MIN_NAME_LENGTH} and ${PRODUCT.MAX_NAME_LENGTH} characters`;
    }
    return '';
  },
  brand: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.brand(value)) {
      return ` must be between ${PRODUCT.MIN_BRAND_LENGTH} and ${PRODUCT.MAX_BRAND_LENGTH} characters`;
    }
    return '';
  },
  description: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.description(value)) {
      return ` must be between ${PRODUCT.MIN_DESCRIPTION_LENGTH} and ${PRODUCT.MAX_DESCRIPTION_LENGTH} characters`;
    }
    return '';
  },
  image: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.image(value)) {
      return ' must be valid';
    }
    return '';
  },
  productCategory: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.productCategory(value)) {
      return ' must be one of the listed';
    }
    return '';
  },
  price: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.price(value)) {
      return ` must be a number between ${PRODUCT.MIN_PRICE_VALUE} and ${PRODUCT.MAX_PRICE_VALUE}`;
    }
    return '';
  },
  stockCount: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.stockCount(value)) {
      return ` must be a number between ${PRODUCT.MIN_STOCK_COUNT} and ${PRODUCT.MAX_STOCK_COUNT}`;
    }
    return '';
  },
  discount: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.discount(value)) {
      return ` must be a number between ${PRODUCT.MIN_DISCOUNT_VALUE} and ${PRODUCT.MAX_DISCOUNT_VALUE}`;
    }
    return '';
  },
  isDeleted: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.isDeleted(value)) {
      return ` must be true or false`;
    }
    return '';
  },
  modelNumber: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.modelNumber(value)) {
      return ` must be between ${PRODUCT.MIN_MODEL_NUMBER_LENGTH} and ${PRODUCT.MAX_MODEL_NUMBER_LENGTH} characters`;
    }
    return '';
  },
  sku: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.sku(value)) {
      return ` must be between ${PRODUCT.MIN_SKU_LENGTH} and ${PRODUCT.MAX_SKU_LENGTH} characters`;
    }
    return '';
  },
  releaseYear: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.releaseYear(value)) {
      return ` must be a number between ${PRODUCT.MIN_RELEASE_YEAR} and ${PRODUCT.MAX_RELEASE_YEAR}`;
    }
    return '';
  },
  color: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.color(value)) {
      return ` must be between ${PRODUCT.MIN_COLOR_LENGTH} and ${PRODUCT.MAX_COLOR_LENGTH} characters`;
    }
    return '';
  },
  colorFamily: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.colorFamily(value)) {
      return ` must be between ${PRODUCT.MIN_COLOR_FAMILY_LENGTH} and ${PRODUCT.MAX_COLOR_FAMILY_LENGTH} characters`;
    }
    return '';
  },
  dimensions: (value, match) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.dimensions(value, match)) {
      return ' must be in the format H x W x D inches';
    }
    return '';
  },
  weight: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.weight(value)) {
      return ` must be between ${PRODUCT.MIN_WEIGHT} and ${PRODUCT.MAX_WEIGHT} pounds`;
    }
    return '';
  }
};

export default validateInputProduct;
