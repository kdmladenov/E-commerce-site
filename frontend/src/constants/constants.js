export const BASE_URL = 'http://localhost:5555';

export const MAX_PRODUCT_QTY_FOR_PURCHASE = 10;


export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE = 100;
export const TAX_RATE = 0.2;

export const USER = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 20,
  MIN_FULL_NAME_LENGTH: 2,
  MAX_FULL_NAME_LENGTH: 100,
  MIN_EMAIL_LENGTH: 4,
  MAX_EMAIL_LENGTH: 100,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, // letters, numbers and at least 1 uppercase
  DEFAULT_AVATAR: `storage/avatars/defaultAvatar.png`
};
