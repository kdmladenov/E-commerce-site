import { USER } from '../constants/constants';

const profileAddressInitialInputState = {
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
      minLength: USER.MIN_ZIP_LENGTH,
      maxLength: USER.MAX_ZIP_LENGTH
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

export default profileAddressInitialInputState;
