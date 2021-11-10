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

export const addressInitialInputState = {
  address: {
    label: 'Address',
    type: 'text',
    placeholder: 'Your address ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_ADDRESS_LENGTH,
      maxLength: USER.MAX_ADDRESS_LENGTH
    },
    valid: true,
    touched: false
  },
  address2: {
    label: 'Address 2',
    type: 'text',
    placeholder: 'Your address 2 ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_ADDRESS_LENGTH,
      maxLength: USER.MAX_ADDRESS_LENGTH
    },
    valid: true,
    touched: false
  },
  city: {
    label: 'City',
    type: 'text',
    placeholder: 'Your city ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_CITY_LENGTH,
      maxLength: USER.MAX_CITY_LENGTH
    },
    valid: true,
    touched: false
  },
  state: {
    label: 'State',
    type: 'text',
    placeholder: 'Your state ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_STATE_LENGTH,
      maxLength: USER.MAX_STATE_LENGTH
    },
    valid: true,
    touched: false
  },
  zip: {
    label: 'Zip',
    type: 'text',
    placeholder: 'Your zip ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_ZIP_VALUE,
      maxLength: USER.MAX_ZIP_VALUE
    },
    valid: true,
    touched: false
  },
  country: {
    label: 'Country',
    type: 'text',
    placeholder: 'Your country ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_COUNTRY_LENGTH,
      maxLength: USER.MAX_COUNTRY_LENGTH
    },
    valid: true,
    touched: false
  }
};
