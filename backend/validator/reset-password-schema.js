import { user } from '../constants/constants.js';

export default {
  password: (value) => user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value) => user.PASSWORD_REGEX.test(value)
};
