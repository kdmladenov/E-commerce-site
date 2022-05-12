import { user } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';

export default {
  email: (value: string) =>
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
  password: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length <= user.MAX_PASSWORD_LENGTH &&
      user.PASSWORD_REGEX.test(value)),
  reenteredPassword: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length <= user.MAX_PASSWORD_LENGTH &&
      user.PASSWORD_REGEX.test(value)),
  fullName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_FULL_NAME_LENGTH &&
      value.length <= user.MAX_FULL_NAME_LENGTH),
  phone: (value: string) => !value || (typeof value === 'string' && user.PHONE_REGEX.test(value)),
  avatar: (value: string) => !value || typeof value === 'string',
  address: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_ADDRESS_LENGTH &&
      value.length <= user.MAX_ADDRESS_LENGTH),
  address2: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_ADDRESS_LENGTH &&
      value.length <= user.MAX_ADDRESS_LENGTH),
  city: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_CITY_LENGTH &&
      value.length <= user.MAX_CITY_LENGTH),
  state: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_STATE_LENGTH &&
      value.length <= user.MAX_STATE_LENGTH),
  zip: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_ZIP_LENGTH &&
      value.length <= user.MAX_ZIP_LENGTH),
  country: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_COUNTRY_LENGTH &&
      value.length <= user.MAX_COUNTRY_LENGTH),
  role: (value: string) => !value || Object.keys(rolesEnum).includes(value),
  isDeleted: (value: boolean) => !value || typeof value === 'boolean'
};
