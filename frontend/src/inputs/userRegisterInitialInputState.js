import { USER } from '../constants/constants';

const userRegisterInitialInputState = {
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
  reenteredEmail: {
    label: 'Re-enter email',
    type: 'email',
    placeholder: 'Re-enter your email ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  },
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Your password ...',
    value: '',
    validations: {
      required: true,
      format: USER.PASSWORD_REGEX
    },
    valid: true,
    touched: false
  },
  reenteredPassword: {
    label: 'Re-enter password',
    type: 'password',
    placeholder: 'Re-enter your password ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  }
};

export default userRegisterInitialInputState;
