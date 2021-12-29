import bcrypt from 'bcrypt';
import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import { user as userConstants } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { DB_CONFIG, PRIVATE_KEY } from '../../config.js';
import { forgotPassword } from '../constants/constants.js';

const getUser = (usersData) => async (userId, isProfileOwner, role) => {
  const user = await usersData.getBy('user_id', userId, isProfileOwner, role);
  if (!user) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  return {
    error: null,
    result: user
  };
};

const getAllUsers = (usersData) => async (search, sort, page, pageSize, role) => {
  const result = await usersData.getAll(search, sort, page, pageSize, role);

  return result;
};

// register
const createUser = (usersData) => async (user) => {
  if (user.password !== user.reenteredPassword) {
    return {
      error: errors.BAD_REQUEST,
      result: null
    };
  }

  const existingUser = await usersData.getBy('email', user.email, true);

  if (existingUser) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null
    };
  }

  const password = await bcrypt.hash(user.password, 10);

  return {
    error: null,
    result: await usersData.create({ ...user, password })
  };
};

// login
const login = (usersData) => async (email, password) => {
  const user = await usersData.loginUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      error: errors.INVALID_LOGIN,
      result: null
    };
  }

  return {
    error: null,
    result: user
  };
};

// change password
const changePassword = (usersData) => async (passwordData, userId, role) => {
  const existingUser = await usersData.getBy('user_id', userId);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const { password: savedPassword } = await usersData.getPasswordBy('user_id', userId);
  const { password, reenteredPassword, currentPassword } = passwordData;
  // not matching passwords or the user is not admin
  if (
    password !== reenteredPassword ||
    (!(await bcrypt.compare(currentPassword, savedPassword)) && role !== rolesEnum.admin)
  ) {
    return {
      error: errors.BAD_REQUEST,
      result: null
    };
  }

  const update = await bcrypt.hash(password, 10);
  await usersData.updatePassword(userId, update);
  return {
    error: null,
    result: { message: 'The password was successfully changed' }
  };
};

// update profile
const update = (usersData) => async (userUpdate, userId) => {
  // const { email, reenteredEmail } = userUpdate;
  // if (email && email !== reenteredEmail) {
  //   return {
  //     error: errors.BAD_REQUEST,
  //     result: null
  //   };
  // }

  const existingUser = await usersData.getBy('user_id', userId, true);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  if (userUpdate.email) {
    const user = await usersData.getBy('email', userUpdate.email, true);
    if (user && user.userId !== userId) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null
      };
    }
  }

  const updatedUser = { ...existingUser, ...userUpdate, userId };
  await usersData.updateData(updatedUser);

  return {
    error: null,
    result: updatedUser
  };
};

// delete user
const deleteUser = (usersData) => async (userId) => {
  const existingUser = await usersData.getBy('user_id', userId);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  await usersData.remove(userId);

  return {
    error: null,
    result: existingUser
  };
};

const logout = (usersData) => async (token) => {
  await usersData.logoutUser(token);
};

// restore deleted user
const restoreUser = (usersData) => async (deletedUserId) => {
  const existingDeletedUser = await usersData.getBy('user_id', +deletedUserId, false, 'admin');
  if (!existingDeletedUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  await usersData.restore(deletedUserId);

  return {
    error: null,
    result: existingDeletedUser
  };
};

// forgotten password
const forgottenPassword = (usersData) => async (email) => {
  const existingUser = await usersData.getBy('email', email);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }
  const { password: savedPassword } = await usersData.getPasswordBy('user_id', existingUser.userId);
  const newPrivateKey = PRIVATE_KEY + savedPassword;
  const payload = {
    email: existingUser.email,
    id: existingUser.userId
  };

  const token = jwt.sign(payload, newPrivateKey, {
    expiresIn: forgotPassword.tokenExpiration
  });
  const link = `http://${DB_CONFIG.host}:${forgotPassword.frontEndPort}/reset-password/${existingUser.userId}/${token}`;
  // Sending mail with reset link
  const transporter = nodemailer.createTransport({
    service: forgotPassword.emailService,
    auth: {
      user: forgotPassword.emailUser,
      pass: forgotPassword.emailPassword
    }
  });
  const options = {
    from: forgotPassword.emailUser,
    to: `${existingUser.email}`,
    subject: 'Password reset link.',
    text: `Dear ${existingUser.firstName},\nA request has been received to reset yor password. You can do that by clicking on the below link.\n
${link}\nIf you did not initiate the request, just ignore this email - your password will not be changed.`
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      return;
    }
    console.log(`Sent: + ${info.response}`);
  });

  return {
    error: null,
    result: { message: `The password reset link has been send to ${email}` }
  };
};

// reset password
const resetPassword = (usersData) => async (password, reenteredPassword, userId, token) => {
  const existingUser = await usersData.getBy('user_id', userId);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const { password: savedPassword } = await usersData.getPasswordBy('user_id', userId);
  const newPrivateKey = PRIVATE_KEY + savedPassword;
  const payload = jwt.verify(token, newPrivateKey);

  if (password !== reenteredPassword || !payload) {
    return {
      error: errors.BAD_REQUEST,
      result: null
    };
  }

  const updated = await bcrypt.hash(password, 10);
  await usersData.updatePassword(userId, updated);

  // Sending confirmation mail for the reset password
  const transporter = nodemailer.createTransport({
    service: forgotPassword.emailService,
    auth: {
      user: forgotPassword.emailUser,
      pass: forgotPassword.emailPassword
    }
  });

  const options = {
    from: forgotPassword.emailUser,
    to: `${existingUser.email}`,
    subject: 'Your password has been reset.',
    text: `Dear ${existingUser.firstName},\nYour password has been reset.\nThank you!`
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      return;
    }
    console.log(`Sent: + ${info.response}`);
  });

  return {
    error: null,
    result: { message: 'The password was successfully reset' }
  };
};

const addUserAvatar = (usersData) => async (userId, imageUrl) => {
  const existingUser = await usersData.getBy('user_id', userId, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, avatar: imageUrl };
  await usersData.updateData(updatedUser);

  return {
    error: null,
    result: updatedUser
  };
};

const deleteUserAvatar = (usersData) => async (userId) => {
  const existingUser = await usersData.getBy('user_id', userId, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, avatar: userConstants.DEFAULT_AVATAR };
  await usersData.updateData(updatedUser);

  return {
    error: null,
    result: updatedUser.avatar
  };
};

export default {
  getUser,
  getAllUsers,
  createUser,
  login,
  changePassword,
  update,
  deleteUser,
  restoreUser,
  logout,
  forgottenPassword,
  resetPassword,
  addUserAvatar,
  deleteUserAvatar
};
