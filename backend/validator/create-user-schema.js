import { user } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';

export default {
  email: (value) =>
    typeof value === 'string' &&
    value.length >= user.MIN_EMAIL_LENGTH &&
    value.length <= user.MAX_EMAIL_LENGTH &&
    user.EMAIL_REGEX.test(value),
  // reenteredEmail: (value) =>
  //   !value ||
  //   (typeof value === 'string' &&
  //     value.length >= user.MIN_EMAIL_LENGTH &&
  //     value.length <= user.MAX_EMAIL_LENGTH &&
  //     user.EMAIL_REGEX.test(value)),
  password: (value) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value) => (value) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value),
  fullName: (value) =>
    typeof value === 'string' &&
    value.length >= user.MIN_FULL_NAME_LENGTH &&
    value.length <= user.MAX_FULL_NAME_LENGTH,
  phone: (value) => !value || (typeof value === 'string' && user.PHONE_REGEX.test(value)),
  avatar: (value) => !value || typeof value === 'string',
  address: (value) =>
    typeof value === 'string' &&
    value.length >= user.MIN_ADDRESS_LENGTH &&
    value.length <= user.MAX_ADDRESS_LENGTH,
  address2: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_ADDRESS_LENGTH &&
      value.length <= user.MAX_ADDRESS_LENGTH),
  city: (value) =>
    typeof value === 'string' &&
    value.length >= user.MIN_CITY_LENGTH &&
    value.length <= user.MAX_CITY_LENGTH,
  state: (value) =>
    typeof value === 'string' &&
    value.length >= user.MIN_STATE_LENGTH &&
    value.length <= user.MAX_STATE_LENGTH,
  zip: (value) =>
    typeof +value === 'number' && value >= user.MIN_ZIP_VALUE && value <= user.MAX_ZIP_VALUE,
  country: (value) =>
    typeof value === 'string' &&
    value.length >= user.MIN_COUNTRY_LENGTH &&
    value.length <= user.MAX_COUNTRY_LENGTH,
  role: (value) => !value || Object.keys(rolesEnum).includes(value),
  isDeleted: (value) => !value || typeof value === 'boolean'
};

// export default {
//   email: (value) =>
//     typeof value === 'string' &&
//     value.length >= user.MIN_EMAIL_LENGTH &&
//     value.length <= user.MAX_EMAIL_LENGTH &&
//     user.EMAIL_REGEX.test(value),
//   password: (value) =>
//     typeof value === 'string' &&
//     value.length <= user.MAX_PASSWORD_LENGTH &&
//     user.PASSWORD_REGEX.test(value),
//   reenteredPassword: (value) =>
//     typeof value === 'string' &&
//     value.length <= user.MAX_PASSWORD_LENGTH &&
//     user.PASSWORD_REGEX.test(value),
//   fullName: (value) =>
//     typeof value === 'string' &&
//     value.length >= user.MIN_FULLNAME_LENGTH &&
//     value.length <= user.MAX_FULLNAME_LENGTH,
//   avatar: (value) => !value || typeof value === 'string',
//   phone: (value) => !value || (typeof value === 'string' && user.PHONE_REGEX.test(value)),
//   address: (value) => typeof value === 'string',
//   address2: (value) => !value || typeof value === 'string',
//   city: (value) => typeof value === 'string',
//   zip: (value) => typeof value === 'string',
//   state: (value) => typeof value === 'string',
//   country: (value) => typeof value === 'string',
//   role: (value) => !value || Object.keys(rolesEnum).includes(value),
//   isDeleted: (value) => !value || typeof value === 'boolean'
// };