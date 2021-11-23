export const user = {
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
  MIN_STATE_LENGTH: 4,
  MAX_STATE_LENGTH: 14,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 20,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  DEFAULT_AVATAR: `storage/avatars/defaultAvatar.png`,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // letters, numbers and at least 1 uppercase
};

export const paging = {
  DEFAULT_PAGE: 1,
  MIN_USERS_PAGESIZE: 5,
  MAX_USERS_PAGESIZE: 20,
  DEFAULT_USERS_PAGESIZE: 12,
  MIN_PRODUCT_PAGESIZE: 5,
  MAX_PRODUCT_PAGESIZE: 20,
  DEFAULT_PRODUCT_PAGESIZE: 20,
  MIN_HISTORY_PAGESIZE: 5,
  MAX_HISTORY_PAGESIZE: 15,
  DEFAULT_HISTORY_PAGESIZE: 12,
  MIN_WISH_LIST_PAGESIZE: 5,
  MAX_WISH_LIST_PAGESIZE: 15,
  DEFAULT_WISH_LIST_PAGESIZE: 12
};

export const product = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 250,
  MIN_BRAND_LENGTH: 3,
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
  RATING_REGEX: /^[1-5]$/,
  MIN_PRODUCT_ID_VALUE: 1
};

export const uploads = {
  VALID_FILE_FORMATS: ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'webp'],
  MAX_FILE_SIZE: 102400, //   divide by 1000 for KB
  MIN_FILE_SIZE: 0
};

export const forgotPassword = {
  tokenExpiration: '15m',
  emailService: 'hotmail',
  emailUser: 'fullstackecommercestore@outlook.com',
  emailPassword: 'Sekretenklu4',
  frontEndPort: 3000
};

export const order = {
  PAYMENT_METHODS: ['Paypal'],
  MIN_TAX_PRICE: 0,
  MIN_SHIPPING_PRICE: 0,
  MIN_TOTAL_PRICE: 0
};

export const review = {
  MIN_CONTENT_LENGTH: 2,
  MIN_TITLE_LENGTH: 2,
  MAX_TITLE_LENGTH: 255,
  DEFAULT_RATING_MIN: 0,
  DEFAULT_RATING_MAX: 5,
  MIN_REVIEWS_PAGESIZE: 5,
  MAX_REVIEWS_PAGESIZE: 100,
  DEFAULT_REVIEWS_PAGESIZE: 100,
  DEFAULT_PAGE: 1
};

export const questions = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 255
};

export const answers = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 1000
};