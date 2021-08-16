import {
  user as USER
} from "./constants.js";

export default {
  user: {
    email: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    newEmail: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    reenteredNewEmail: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    fullName: `Expected string with length in the range [${USER.MIN_FIRSTNAME_LENGTH}-${USER.MAX_FIRSTNAME_LENGTH}]`,
    avatar: `Expected string path`,
    phone: `Expected valid phone number`,
    address: `Expected string`,
    address2: `Expected string`,
    city: `Expected string`,
    zip: `Expected string`,
    state: `Expected string`,
    country: `Expected string`,
    role: `Expected string`,
    state: `Expected "admin" or "basic" string`,
    isDeleted: `Expected boolean`
  }
};
