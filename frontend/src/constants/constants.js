export const BASE_URL = 'http://localhost:5555';

export const MAX_PRODUCT_QTY_FOR_PURCHASE = 10;


export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE = 100;
export const TAX_RATE = 0.2;

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
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 20,
  MIN_STATE_LENGTH: 4,
  MAX_STATE_LENGTH: 14,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  DEFAULT_AVATAR: `storage/avatars/defaultAvatar.png`,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // letters, numbers and at least 1 uppercase
};