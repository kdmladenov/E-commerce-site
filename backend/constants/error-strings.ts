import { user as USER, product as PRODUCT, questions as QUESTIONS } from './constants.js';

export default {
  user: {
    email: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    newEmail: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    reenteredNewEmail: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    fullName: `Expected string with length in the range [${USER.MIN_FULL_NAME_LENGTH}-${USER.MAX_FULL_NAME_LENGTH}]`,
    avatar: `Expected string path`,
    phone: `Expected valid phone number`,
    address: `Expected string`,
    address2: `Expected string`,
    city: `Expected string`,
    zip: `Expected a string in the range [${USER.MIN_ZIP_LENGTH}-${USER.MAX_ZIP_LENGTH}]`,
    state: `Expected string`,
    country: `Expected string`,
    role: `Expected "admin" or "basic" string`,
    isDeleted: `Expected boolean`
  },
  product: {
    title: `Expected valid name string with length in the range [${PRODUCT.MIN_NAME_LENGTH}-${PRODUCT.MAX_NAME_LENGTH}]`,
    brand: `Expected valid brand string with length in the range [${PRODUCT.MIN_BRAND_LENGTH}-${PRODUCT.MAX_BRAND_LENGTH}]`,
    description: `Expected valid description string with length in the range [${PRODUCT.MIN_DESCRIPTION_LENGTH}-${PRODUCT.MAX_DESCRIPTION_LENGTH}]`,
    image: `Expected valid image path string`,
    product_category: `Expected valid string from the product_category enum`,
    price: `Expected valid number with value in the range [${PRODUCT.MIN_PRICE_VALUE}-${PRODUCT.MAX_PRICE_VALUE}]`,
    stock_count: `Expected valid number count in the range [${PRODUCT.MIN_STOCK_COUNT}-${PRODUCT.MAX_STOCK_COUNT}]`,
    discount: `Expected valid number count in the range [${PRODUCT.MIN_DISCOUNT_VALUE}-${PRODUCT.MAX_DISCOUNT_VALUE}]`
    // review_count: `Expected valid number count in the range [${PRODUCT.MIN_REVIEW_COUNT}-${PRODUCT.MAX_REVIEW_COUNT}]`,
    // rating: `Expected valid rating with length in the range [${PRODUCT.MIN_RATING_VALUE}-${PRODUCT.MAX_REVIEW_COUNT}]`
  },
  question: {
    questionContent: `Expected valid name string with length in the range [${QUESTIONS.MIN_CONTENT_LENGTH}-${QUESTIONS.MAX_CONTENT_LENGTH}]`
  }
};
