import { PRODUCT } from '../constants/constants';
import productCategoriesEnum from '../constants/product-categories.enum';

const validate = {
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
  image: (value: string) => typeof value === 'string',
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
  isDeleted: (value: boolean) => typeof value === 'boolean',
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

const validateInputProduct = {
  title: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.title(value)) {
      return ` must be between ${PRODUCT.MIN_NAME_LENGTH} and ${PRODUCT.MAX_NAME_LENGTH} characters`;
    }
    return '';
  },
  brand: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.brand(value)) {
      return ` must be between ${PRODUCT.MIN_BRAND_LENGTH} and ${PRODUCT.MAX_BRAND_LENGTH} characters`;
    }
    return '';
  },
  description: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.description(value)) {
      return ` must be between ${PRODUCT.MIN_DESCRIPTION_LENGTH} and ${PRODUCT.MAX_DESCRIPTION_LENGTH} characters`;
    }
    return '';
  },
  image: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.image(value)) {
      return ' must be valid';
    }
    return '';
  },
  productCategory: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.productCategory(value)) {
      return ' must be one of the listed';
    }
    return '';
  },
  price: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.price(+value)) {
      return ` must be a number between ${PRODUCT.MIN_PRICE_VALUE} and ${PRODUCT.MAX_PRICE_VALUE}`;
    }
    return '';
  },
  stockCount: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.stockCount(+value)) {
      return ` must be a number between ${PRODUCT.MIN_STOCK_COUNT} and ${PRODUCT.MAX_STOCK_COUNT}`;
    }
    return '';
  },
  discount: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.discount(+value)) {
      return ` must be a number between ${PRODUCT.MIN_DISCOUNT_VALUE} and ${PRODUCT.MAX_DISCOUNT_VALUE}`;
    }
    return '';
  },
  // isDeleted: (value: boolean) => {
  //   if (!value) {
  //     return ' is required!';
  //   }
  //   if (!validate.isDeleted(value)) {
  //     return ` must be true or false`;
  //   }
  //   return '';
  // },
  modelNumber: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.modelNumber(value)) {
      return ` must be between ${PRODUCT.MIN_MODEL_NUMBER_LENGTH} and ${PRODUCT.MAX_MODEL_NUMBER_LENGTH} characters`;
    }
    return '';
  },
  sku: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.sku(value)) {
      return ` must be between ${PRODUCT.MIN_SKU_LENGTH} and ${PRODUCT.MAX_SKU_LENGTH} characters`;
    }
    return '';
  },
  releaseYear: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.releaseYear(+value)) {
      return ` must be a number between ${PRODUCT.MIN_RELEASE_YEAR} and ${PRODUCT.MAX_RELEASE_YEAR}`;
    }
    return '';
  },
  color: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.color(value)) {
      return ` must be between ${PRODUCT.MIN_COLOR_LENGTH} and ${PRODUCT.MAX_COLOR_LENGTH} characters`;
    }
    return '';
  },
  colorFamily: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.colorFamily(value)) {
      return ` must be between ${PRODUCT.MIN_COLOR_FAMILY_LENGTH} and ${PRODUCT.MAX_COLOR_FAMILY_LENGTH} characters`;
    }
    return '';
  },
  dimensions: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.dimensions(value)) {
      return ' must be in the format H x W x D inches';
    }
    return '';
  },
  weight: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.weight(+value)) {
      return ` must be between ${PRODUCT.MIN_WEIGHT} and ${PRODUCT.MAX_WEIGHT} pounds`;
    }
    return '';
  }
};

export default validateInputProduct;
