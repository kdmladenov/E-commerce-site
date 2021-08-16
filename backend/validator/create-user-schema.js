import { user } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';

export default {
  email: value => typeof value === 'string' && user.EMAIL_REGEX.test(value),
  password: value => typeof value === 'string' && value.length <= user.MAX_PASSWORD_LENGTH && user.PASSWORD_REGEX.test(value),
  reenteredPassword: value => typeof value === 'string' && value.length <= user.MAX_PASSWORD_LENGTH && user.PASSWORD_REGEX.test(value),
  fullName: value => (typeof value === 'string' && value.length >= user.MIN_FULLNAME_LENGTH && value.length <= user.MAX_FULLNAME_LENGTH),
  avatar: value => !value || (typeof value === 'string'),
  phone: value => !value || (typeof value === 'string' && user.PHONE_REGEX.test(value)),
  address: value => typeof value === 'string',
  address2: value => !value || typeof value === 'string',
  city: value => typeof value === 'string',
  zip: value => typeof value === 'string',
  state: value => typeof value === 'string',
  country: value => typeof value === 'string',
  role: value => !value || Object.keys(rolesEnum).includes(value),
  isDeleted: value => !value || (typeof value === 'boolean'),
};
