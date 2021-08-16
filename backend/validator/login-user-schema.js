import { user } from '../constants/constants.js';

export default {
  email: (value) => typeof value === 'string' && user.EMAIL_REGEX.test(value),
  password: (value) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value)
};
