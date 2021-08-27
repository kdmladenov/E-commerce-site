import express from 'express';
import ordersData from '../data/orders-data.js';
import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import ordersServices from '../services/orders-services.js';
import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';
import rolesEnum from '../constants/roles.enum.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';
import createOrderSchema from '../validator/create-order-schema.js';

const ordersController = express.Router();

ordersController
  // @desc Create new order
  // @route POST /orders
  // @access Private
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    // roleMiddleware(rolesEnum.admin),
    validateBody('order', createOrderSchema),
    // errorHandler(
      async (req, res) => {
      const data = req.body;
      const userId = req.user.userId;
        console.log(data, userId, 'data, userId');
      const {
        error,
        order
      } = await ordersServices.addOrderItems(ordersData)(data, userId);

        res.status(201).send(order);
    })
  

export default ordersController;
