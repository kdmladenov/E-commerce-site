import {
  user as USER
} from "./constants.js";

export default {
  user: {
    username: `Expected string with length in the range [${USER.MIN_USERNAME_LENGTH}-${USER.MAX_USERNAME_LENGTH}]`,
    password: `Expected string with length in the range [${USER.MIN_PASSWORD_LENGTH}-${USER.MAX_PASSWORD_LENGTH}]`,
    newPassword: `Expected string with length in the range [${USER.MIN_PASSWORD_LENGTH}-${USER.MAX_PASSWORD_LENGTH}]`,
    reenteredNewPassword: `Expected string with length in the range [${USER.MIN_PASSWORD_LENGTH}-${USER.MAX_PASSWORD_LENGTH}]`,
    userId: `Expected a positive number`,
    oldPassword: `Expected string with length in the range [${USER.MIN_PASSWORD_LENGTH}-${USER.MAX_PASSWORD_LENGTH}]`,
    firstName: `Expected string with length in the range [${USER.MIN_FIRSTNAME_LENGTH}-${USER.MAX_FIRSTNAME_LENGTH}]`,
    lastName: `Expected string with length in the range [${USER.MIN_LASTNAME_LENGTH}-${USER.MAX_LASTNAME_LENGTH}]`,
    email: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    newEmail: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    reenteredNewEmail: `Expected valid e-mail string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    phone: `Expected valid phone number`,
    birthDate: `Expected a valid date string`,
    gender: `Expected 'male', 'female' or 'other'`,
    isBanned: `Expected boolean`,
    isDeleted: `Expected boolean`,
    isAdmin: `Expected boolean`,
  }
};
