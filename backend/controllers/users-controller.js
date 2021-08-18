import express from 'express';
import usersData from '../data/users-data.js';
import validateBody from '../middleware/validate-body.js';
import errors from '../constants/service-errors.js';
import usersService from '../services/users-service.js';
import createUserSchema from '../validator/create-user-schema.js';
import updateUserSchema from '../validator/update-user-schema.js';
import deleteUserSchema from '../validator/delete-user-schema.js';
import updatePasswordSchema from '../validator/update-password-schema.js';
import forgottenPasswordSchema from '../validator/forgotten-password-schema.js';
import resetPasswordSchema from '../validator/reset-password-schema.js';
import { authMiddleware } from '../authentication/auth.middleware.js';
import rolesEnum from '../constants/roles.enum.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import { paging } from '../constants/constants.js';
import validateFile from '../middleware/validate-file.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import uploadAvatar from '../middleware/upload-avatar.js';
import errorHandler from '../middleware/errorHandler.js';

const usersController = express.Router();

usersController

  // @desc Register new user
  // @route POST /users
  // @access Public - guest
  .post(
    '/',
    validateBody('user', createUserSchema),
    errorHandler(async (req, res) => {
      const user = req.body;
      // user.role = rolesEnum.basic;

      const { error, result } = await usersService.createUser(usersData)(user);

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'User with same username or email already exists.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )

  // @desc Get all users
  // @route GET /users
  // @access Private - logged
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const { role } = req.user;
      const { search = '', searchBy = 'fullName', sort = 'fullName', order = 'ASC' } = req.query;
      let { pageSize = paging.DEFAULT_USERS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_USERS_PAGESIZE) pageSize = paging.MAX_USERS_PAGESIZE;
      if (+pageSize < paging.MIN_USERS_PAGESIZE) pageSize = paging.MIN_USERS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const result = await usersService.getAllUsers(usersData)(
        search,
        searchBy,
        sort,
        order,
        +page,
        +pageSize,
        role
      );
      res.status(200).send(result);
    })
  )

  // .get(
  //   '/:userId/timeline',
  //   authMiddleware,
  //   loggedUserGuard,
  //   // errorHandler(
  //     async (req, res) => {
  //     const { role } = req.user;
  //     const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
  //     const { error, result } = await usersService.getUserTimeline(usersData)(+id);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: `User ${id} is not found.`
  //       });
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  // // )
  // ;

  // upload avatar
  .put(
    '/:userId/avatar',
    authMiddleware,
    uploadAvatar.single('avatar'),
    validateFile('uploads', uploadFileSchema),
    errorHandler(async (req, res) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const { path } = req.file;
      await usersService.changeAvatar(usersData)(+id, path.replace(/\\/g, '/'));

      res.status(200).send({ message: 'Avatar changed' });
    })
  )

  // get avatar
  .get(
    '/:userId/avatar',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const { error, result } = await usersService.getUserAvatar(usersData)(+id);
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found .`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // delete avatar
  .delete(
    '/:userId/avatar',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
    async (req, res) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const { error, result } = await usersService.deleteUserAvatar(usersData)(+id);
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    }
  )
  // )

  // @desc Get user by ID
  // @route GET /users/:userId
  // @access Private - logged
  .get(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const { userId } = req.params;
      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;
      const { error, result } = await usersService.getUser(usersData)(userId, isProfileOwner, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc Get user by ID
  // @route GET /users/:userId
  // @access Private - logged
  .patch(
    '/:userId/change-password',
    authMiddleware,
    loggedUserGuard,
    validateBody('user', updatePasswordSchema),
    errorHandler(async (req, res) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const passwordData = req.body;

      const { error, result } = await usersService.changePassword(usersData)(
        passwordData,
        id,
        role
      );

      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message: 'The request was invalid. Passwords do not match.'
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc EDIT user data
  // @route PUT /users/:id
  // @access Private - logged
  .put(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    validateBody('user', updateUserSchema),
    errorHandler(async (req, res) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const update = req.body;

      const { error, result } = await usersService.update(usersData)(update, +id);

      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message: 'The request was invalid. Emails are required or do not match.'
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'User with same email already exists.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc EDIT user data
  // @route PUT /users/:id
  // @access Private - logged
  .delete(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    validateBody('user', deleteUserSchema),
    errorHandler(async (req, res) => {
      const { role } = req.user;
      // case admin-delete every user, case: basic user - delete only itself
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;

      const { error, result } = await usersService.deleteUser(usersData)(+id);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // Forgotten password with mail password reset
  .post(
    '/forgotten-password',
    validateBody('user', forgottenPasswordSchema),
    errorHandler(async (req, res) => {
      const { email } = req.body;

      const { error, result } = await usersService.forgottenPassword(usersData)(email);
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `A user with email ${email} is not found`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // Reset password
  .post(
    '/reset-password/:userId/:token',
    validateBody('user', resetPasswordSchema),
    errorHandler(async (req, res) => {
      const { password, reenteredPassword } = req.body;
      const { userId, token } = req.params;

      const { error, result } = await usersService.resetPassword(usersData)(
        password,
        reenteredPassword,
        +userId,
        token
      );
      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message: 'The request was invalid. Passwords do not match or the token has been changed.'
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );
export default usersController;
