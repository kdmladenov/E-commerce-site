import { user } from '../constants/constants.js';

export default {
  email: (value) => user.EMAIL_REGEX.test(value)
};
