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
import errors from '../constants/service-errors.js';
import updateOrderSchema from '../validator/update-order-schema.js';

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
    validateBody('order', createOrderSchema), //TO BE FINISHED
    errorHandler(async (req, res) => {
      const data = req.body;
      const userId = req.user.userId;
      console.log(data, userId, 'data, userId');
      const { error, order } = await ordersServices.addOrderItems(ordersData)(data, userId);

      res.status(201).send(order);
    })
  )
  // @desc GET order by ID
  // @route GET /orders/:orderId
  // @access Private - admin or user who made the order
  .get(
    '/:orderId',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
      async (req, res) => {
        const { role, userId } = req.user;
        const { orderId } = req.params;
        const { error, order } = await ordersServices.getOrderById(ordersData)(orderId, role, userId);
        
        if (error === errors.RECORD_NOT_FOUND) {
          res.status(404).send({
            message: 'The order is not found.'
          });
        } else if (error === errors.OPERATION_NOT_PERMITTED) {
          res.status(403).send({
            message: `You are not authorized to view this order`
          });
        } else {
          res.status(200).send(order);
        }
      }
      )
      // @desc Update order to paid
      // @route PUT /api/orders/:id/pay
      // @access Private
      
      .put(
        '/:orderId/pay',
        authMiddleware,
        loggedUserGuard,
        validateBody('order', updateOrderSchema), // TO DO
        // errorHandler(
    async (req, res) => {
      const { role, userId } = req.user;
      const { orderId } = req.params;
      const paymentData = req.body;
      const { error, order } = await ordersServices.updateOrderToPaid(ordersData)(
        orderId,
        role,
        userId,
        paymentData
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The order is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view or edit this order`
        });
      } else {
        res.status(200).send(order);
      }
    }
  );

export default ordersController;
