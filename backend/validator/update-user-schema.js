import { user } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';

export default {
  email: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_EMAIL_LENGTH &&
      value.length <= user.MAX_EMAIL_LENGTH &&
      user.EMAIL_REGEX.test(value)),
  // reenteredEmail: (value) =>
  //   !value ||
  //   (typeof value === 'string' &&
  //     value.length >= user.MIN_EMAIL_LENGTH &&
  //     value.length <= user.MAX_EMAIL_LENGTH &&
  //     user.EMAIL_REGEX.test(value)),
  password: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length <= user.MAX_PASSWORD_LENGTH &&
      user.PASSWORD_REGEX.test(value)),
  reenteredPassword: (value) =>
    !value ||
    ((value) =>
      typeof value === 'string' &&
      value.length <= user.MAX_PASSWORD_LENGTH &&
      user.PASSWORD_REGEX.test(value)),
  fullName: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_FULLNAME_LENGTH &&
      value.length <= user.MAX_FULLNAME_LENGTH),
  phone: (value) => !value || (typeof value === 'string' && user.PHONE_REGEX.test(value)),
  address: (value) => !value || typeof value === 'string',
  address2: (value) => !value || typeof value === 'string',
  city: (value) => !value || typeof value === 'string',
  zip: (value) => !value || typeof value === 'string',
  state: (value) => !value || typeof value === 'string',
  country: (value) => !value || typeof value === 'string',
  role: (value) => !value || Object.keys(rolesEnum).includes(value),
  isDeleted: (value) => !value || typeof value === 'boolean'
};
