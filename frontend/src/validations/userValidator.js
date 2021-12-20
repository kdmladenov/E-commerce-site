import { USER } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';

const validate = {
  email: (value) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_EMAIL_LENGTH &&
    value.length <= USER.MAX_EMAIL_LENGTH &&
    USER.EMAIL_REGEX.test(value),
  // reenteredEmail: (value) =>
  //   !value ||
  //   (typeof value === 'string' &&
  //     value.length >= USER.MIN_EMAIL_LENGTH &&
  //     value.length <= USER.MAX_EMAIL_LENGTH &&
  //     USER.EMAIL_REGEX.test(value)),
  password: (value) =>
    typeof value === 'string' &&
    value.length <= USER.MAX_PASSWORD_LENGTH &&
    USER.PASSWORD_REGEX.test(value),
  reenteredPassword: (value) => (value) =>
    typeof value === 'string' &&
    value.length <= USER.MAX_PASSWORD_LENGTH &&
    USER.PASSWORD_REGEX.test(value),
  fullName: (value) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_FULL_NAME_LENGTH &&
    value.length <= USER.MAX_FULL_NAME_LENGTH,
  phone: (value) => !value || (typeof value === 'string' && USER.PHONE_REGEX.test(value)),
  avatar: (value) => !value || typeof value === 'string',
  address: (value) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_ADDRESS_LENGTH &&
    value.length <= USER.MAX_ADDRESS_LENGTH,
  address2: (value) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= USER.MIN_ADDRESS_LENGTH &&
      value.length <= USER.MAX_ADDRESS_LENGTH),
  city: (value) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_CITY_LENGTH &&
    value.length <= USER.MAX_CITY_LENGTH,
  state: (value) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_STATE_LENGTH &&
    value.length <= USER.MAX_STATE_LENGTH,
  zip: (value) =>
    typeof +value === 'number' && value >= USER.MIN_ZIP_VALUE && value <= USER.MAX_ZIP_VALUE,
  country: (value) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_COUNTRY_LENGTH &&
    value.length <= USER.MAX_COUNTRY_LENGTH,
  role: (value) => !value || Object.keys(rolesEnum).includes(value),
  isDeleted: (value) => !value || typeof value === 'boolean'
};

const validateInputUser = {
  email: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.email(value)) {
      return ' must be valid';
    }
    return '';
  },

  reenteredEmail: (value, match) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredEmail(value, match)) {
      return ' does not match';
    }
    return '';
  },

  password: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.password.length(value)) {
      return ` must be between ${USER.MIN_PASSWORD_LENGTH} and ${USER.MAX_PASSWORD_LENGTH} characters`;
    }
    if (!validate.password.lowerCase(value)) {
      return ' must include a lowercase letter';
    }
    if (!validate.password.upperCase(value)) {
      return ' must include an uppercase letter';
    }
    if (!validate.password.digit(value)) {
      return ' must include a digit';
    }
    return '';
  },

  reenteredPassword: (value, match) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredPassword(value, match)) {
      return ' does not match';
    }
    return '';
  },

  currentPassword: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.password.length(value)) {
      return `must be between ${USER.MIN_PASSWORD_LENGTH} and ${USER.MAX_PASSWORD_LENGTH} characters`;
    }
    if (!validate.password.lowerCase(value)) {
      return ' must include a lowercase letter';
    }
    if (!validate.password.upperCase(value)) {
      return ' must include an uppercase letter';
    }
    if (!validate.password.digit(value)) {
      return ' must include a digit';
    }
    return '';
  },

  fullName: (value) => {
    if (!validate.fullName(value)) {
      return ` must be between ${USER.MIN_FULL_NAME_LENGTH} and ${USER.MAX_FULL_NAME_LENGTH} characters`;
    }
    return '';
  },

  // lastName: (value) => {
  //   if (!validate.lastName(value)) {
  //     return ` must be between ${USER.MIN_LAST_NAME_LENGTH} and ${USER.MAX_LAST_NAME_LENGTH} characters`;
  //   }
  //   return '';
  // },

  phone: (value) => {
    if (!validate.phone(value)) {
      return ' must be in the format (XXX) XXX-XXXX';
    }
    return '';
  },

  role: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.role(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  address: (value) => {
    if (!validate.address(value)) {
      return ` must be between ${USER.MIN_ADDRESS_LENGTH} and ${USER.MAX_ADDRESS_LENGTH} characters`;
    }
    return '';
  },

  address2: (value) => {
    if (!validate.address2(value)) {
      return ` must be between ${USER.MIN_ADDRESS_LENGTH} and ${USER.MAX_ADDRESS_LENGTH} characters`;
    }
    return '';
  },

  zip: (value) => {
    if (!validate.zip(value)) {
      return ` must be between a number in range ${USER.MIN_ZIP_VALUE} - ${USER.MAX_ZIP_VALUE}`;
    }
    return '';
  },

  city: (value) => {
    if (!validate.city(value)) {
      return ` must be between ${USER.MIN_CITY_LENGTH} and ${USER.MAX_CITY_LENGTH} characters`;
    }
    return '';
  },
  state: (value) => {
    if (!validate.state(value)) {
      return ` must be between ${USER.MIN_STATE_LENGTH} and ${USER.MAX_STATE_LENGTH} characters`;
    }
    return '';
  },
  country: (value) => {
    if (!validate.country(value)) {
      return ` must be between ${USER.MIN_COUNTRY_LENGTH} and ${USER.MAX_COUNTRY_LENGTH} characters`;
    }
    return '';
  }
};

export default validateInputUser;
