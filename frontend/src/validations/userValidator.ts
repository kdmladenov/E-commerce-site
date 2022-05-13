import { USER } from '../constants/constants';
import rolesEnum from '../constants/roles.enum';

const validate = {
  email: (value: string) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_EMAIL_LENGTH &&
    value.length <= USER.MAX_EMAIL_LENGTH &&
    USER.EMAIL_REGEX.test(value),
  reenteredEmail: (value: string, match?: string) => value === match,
  password: (value: string) =>
    typeof value === 'string' &&
    value.length <= USER.MAX_PASSWORD_LENGTH &&
    USER.PASSWORD_REGEX.test(value),
  reenteredPassword: (value: string, match?: string) => value === match,
  fullName: (value: string) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_FULL_NAME_LENGTH &&
    value.length <= USER.MAX_FULL_NAME_LENGTH,
  phone: (value: string) => !value || (typeof value === 'string' && USER.PHONE_REGEX.test(value)),
  avatar: (value: string) => !value || typeof value === 'string',
  address: (value: string) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_ADDRESS_LENGTH &&
    value.length <= USER.MAX_ADDRESS_LENGTH,
  address2: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= USER.MIN_ADDRESS_LENGTH &&
      value.length <= USER.MAX_ADDRESS_LENGTH),
  city: (value: string) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_CITY_LENGTH &&
    value.length <= USER.MAX_CITY_LENGTH,
  state: (value: string) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_STATE_LENGTH &&
    value.length <= USER.MAX_STATE_LENGTH,
  zip: (value: string) =>
    typeof value === 'string' && value.length >= USER.MIN_ZIP_LENGTH && value.length <= USER.MAX_ZIP_LENGTH,
  country: (value: string) =>
    typeof value === 'string' &&
    value.length >= USER.MIN_COUNTRY_LENGTH &&
    value.length <= USER.MAX_COUNTRY_LENGTH,
  role: (value: string) => !value || Object.keys(rolesEnum).includes(value),
  isDeleted: (value: boolean) => !value || typeof value === 'boolean'
};

const validateInputUser = {
  email: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.email(value)) {
      return ' must be valid';
    }
    return '';
  },

  reenteredEmail: (value: string, match?: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredEmail(value, match)) {
      return ' does not match';
    }
    return '';
  },

  password: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.password(value)) {
      return ` must include ${USER.MIN_PASSWORD_LENGTH} - ${USER.MAX_PASSWORD_LENGTH} letters, numbers and at least 1 uppercase`;
    }

    return '';
  },

  reenteredPassword: (value: string, match?: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredPassword(value, match)) {
      return ' does not match';
    }
    return '';
  },

  fullName: (value: string) => {
    if (!validate.fullName(value)) {
      return ` must be between ${USER.MIN_FULL_NAME_LENGTH} and ${USER.MAX_FULL_NAME_LENGTH} characters`;
    }
    return '';
  },

  phone: (value: string) => {
    if (!validate.phone(value)) {
      return ' must be in the format (XXX) XXX-XXXX';
    }
    return '';
  },

  role: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.role(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  address: (value: string) => {
    if (!validate.address(value)) {
      return ` must be between ${USER.MIN_ADDRESS_LENGTH} and ${USER.MAX_ADDRESS_LENGTH} characters`;
    }
    return '';
  },

  address2: (value: string) => {
    if (!validate.address2(value)) {
      return ` must be between ${USER.MIN_ADDRESS_LENGTH} and ${USER.MAX_ADDRESS_LENGTH} characters`;
    }
    return '';
  },

  zip: (value: string) => {
    if (!validate.zip(value)) {
      return ` must be between a string with length ${USER.MIN_ZIP_LENGTH} - ${USER.MAX_ZIP_LENGTH}`;
    }
    return '';
  },

  city: (value: string) => {
    if (!validate.city(value)) {
      return ` must be between ${USER.MIN_CITY_LENGTH} and ${USER.MAX_CITY_LENGTH} characters`;
    }
    return '';
  },
  state: (value: string) => {
    if (!validate.state(value)) {
      return ` must be between ${USER.MIN_STATE_LENGTH} and ${USER.MAX_STATE_LENGTH} characters`;
    }
    return '';
  },
  country: (value: string) => {
    if (!validate.country(value)) {
      return ` must be between ${USER.MIN_COUNTRY_LENGTH} and ${USER.MAX_COUNTRY_LENGTH} characters`;
    }
    return '';
  }
};

export default validateInputUser;
