import { USER } from '../constants/constants.js';

export const overviewInitialInputState = {
  fullName: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Your full name ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_FULL_NAME_LENGTH,
      maxLength: USER.MAX_FULL_NAME_LENGTH
    },
    valid: true,
    touched: false
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Your email ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_EMAIL_LENGTH,
      maxLength: USER.MAX_EMAIL_LENGTH,
      format: USER.EMAIL_REGEX
    },
    valid: true,
    touched: false
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    placeholder: 'Your phone ...',
    value: '',
    validations: {
      required: true,
      format: USER.PHONE_REGEX
    },
    pattern: USER.PHONE_REGEX,
    valid: true,
    touched: false
  }
};
