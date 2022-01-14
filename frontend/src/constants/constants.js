export const BASE_URL = 'http://localhost:5555';

export const MAX_PRODUCT_QTY_FOR_PURCHASE = 10;
export const PRODUCT_FEATURES_MAIN_COUNT = 5;

export const DAYS_FOR_DELIVERY = 5;
export const DAYS_FOR_RETURNS_AFTER_DELIVERY = 30;

export const FREE_SHIPPING_THRESHOLD = 500;
export const SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE = 0.1;
export const TAX_RATE = 0.2;

export const STORE_NAME = 'MyShop';

export const SLIDER_IMAGE_1 = 'https://m.media-amazon.com/images/I/61lJ3xlQX2L._SX3000_.jpg';

export const USER = {
  MIN_FULL_NAME_LENGTH: 2,
  MAX_FULL_NAME_LENGTH: 100,
  MIN_COMPANY_NAME_LENGTH: 2,
  MAX_COMPANY_NAME_LENGTH: 40,
  MIN_CITY_LENGTH: 3,
  MAX_CITY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 3,
  MAX_COUNTRY_LENGTH: 50,
  MIN_ZIP_VALUE: 100,
  MAX_ZIP_VALUE: 9999,
  MIN_EMAIL_LENGTH: 4,
  MAX_EMAIL_LENGTH: 100,
  MIN_ADDRESS_LENGTH: 4,
  MAX_ADDRESS_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  MIN_STATE_LENGTH: 4,
  MAX_STATE_LENGTH: 14,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  DEFAULT_AVATAR: `storage/avatars/defaultAvatar.png`,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // letters, numbers and at least 1 uppercase
};

export const PAGING = {
  DEFAULT_PAGE: 1,
  MIN_USERS_PAGESIZE: 5,
  MAX_USERS_PAGESIZE: 20,
  DEFAULT_USERS_PAGESIZE: 12,
  MIN_PRODUCT_PAGESIZE: 5,
  MAX_PRODUCT_PAGESIZE: 20,
  DEFAULT_PRODUCT_PAGESIZE: 20,
  MIN_HISTORY_PAGESIZE: 5,
  MAX_HISTORY_PAGESIZE: 20,
  DEFAULT_HISTORY_PAGESIZE: 12,
  MIN_WISH_LIST_PAGESIZE: 5,
  MAX_WISH_LIST_PAGESIZE: 20,
  DEFAULT_WISH_LIST_PAGESIZE: 12
};

export const PRODUCT = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 250,
  MIN_BRAND_LENGTH: 2,
  MAX_BRAND_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 6,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_PRICE_VALUE: 0,
  MAX_PRICE_VALUE: 10000,
  MIN_STOCK_COUNT: 0,
  MAX_STOCK_COUNT: 1000,
  MIN_REVIEW_COUNT: 0,
  MAX_REVIEW_COUNT: 1000,
  MIN_RATING_VALUE: 0,
  MAX_RATING_VALUE: 5,
  MIN_DISCOUNT_VALUE: 0,
  MAX_DISCOUNT_VALUE: 100,
  MIN_RELEASE_YEAR: 2000,
  MAX_RELEASE_YEAR: 2022,
  MIN_WEIGHT: 0.01,
  MAX_WEIGHT: 10000,
  MIN_MODEL_NUMBER_LENGTH: 3,
  MAX_MODEL_NUMBER_LENGTH: 100,
  MIN_COLOR_LENGTH: 3,
  MAX_COLOR_LENGTH: 100,
  MIN_COLOR_FAMILY_LENGTH: 3,
  MAX_COLOR_FAMILY_LENGTH: 100,
  MIN_SKU_LENGTH: 3,
  MAX_SKU_LENGTH: 100,
  MIN_DIMENSIONS_LENGTH: 3,
  MAX_DIMENSIONS_LENGTH: 100,
  DIMENSIONS_REGEX: /\d+(\.\d+|)\s?x\s?\d+(\.\d+|)(\s?x\s?\d*(\.?\d+|))?/,
  RATING_REGEX: /^[1-5]$/,
  MIN_PRODUCT_ID_VALUE: 1
};

export const SPECIFICATIONS = {
  MIN_SCREEN_SIZE: 1,
  MAX_SCREEN_SIZE: 50
};

export const REVIEW = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 10000,
  MIN_TITLE_LENGTH: 2,
  MAX_TITLE_LENGTH: 255,
  DEFAULT_RATING_MIN: 0,
  DEFAULT_RATING_MAX: 5
};

export const QUESTION = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 255
};

export const ANSWER = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 1000
};

export const FEATURE = {
  MIN_FEATURE_TITLE_LENGTH: 2,
  MAX_FEATURE_TITLE_LENGTH: 2000,
  MIN_FEATURE_CONTENT_LENGTH: 2,
  MAX_FEATURE_CONTENT_LENGTH: 2000
};
