export const user = {
  MIN_USERNAME_LENGTH: 2,
  MAX_USERNAME_LENGTH: 40,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 20,
  MIN_FIRSTNAME_LENGTH: 2,
  MAX_FIRSTNAME_LENGTH: 40,
  MIN_LASTNAME_LENGTH: 2,
  MAX_LASTNAME_LENGTH: 40,
  MIN_EMAIL_LENGTH: 4,
  MAX_EMAIL_LENGTH: 100,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, // letters, numbers and at least 1 uppercase
};

export const paging = {
  DEFAULT_PAGE: 1,
  MIN_REVIEWS_PAGESIZE: 5,
  MAX_REVIEWS_PAGESIZE: 15,
  DEFAULT_REVIEWS_PAGESIZE: 10,
  MIN_BOOKS_PAGESIZE: 5,
  MAX_BOOKS_PAGESIZE: 15,
  DEFAULT_BOOKS_PAGESIZE: 10,
  MIN_USERS_PAGESIZE: 5,
  MAX_USERS_PAGESIZE: 15,
  DEFAULT_USERS_PAGESIZE: 10,
  MIN_RECORDS_PAGESIZE: 5,
  MAX_RECORDS_PAGESIZE: 15,
  DEFAULT_RECORDS_PAGESIZE: 10
};

export const uploads = {
  VALID_FILE_FORMATS: ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'webp'],
  MAX_FILE_SIZE: 102400, //   divide by 1000 for KB
  MIN_FILE_SIZE: 0
};