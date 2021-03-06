import express, { Request, Response } from 'express';

import ordersServices from '../services/orders-services.js';

import ordersData from '../data/orders-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import createOrderSchema from '../validator/create-order-schema.js';
import updateOrderToPaidSchema from '../validator/update-order-to-paid-schema.js';

import rolesEnum from '../constants/roles.enum.js';
import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import RequestQuery from '../models/RequestQuery.js';

const ordersController = express.Router();

ordersController
  // @desc Create new order
  // @route POST /orders
  // @access Private
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    validateBody('order', createOrderSchema),
    errorHandler(async (req: Request, res: Response) => {
      const orderData = req.body;
      const userId = req.user.userId;
      const { error, order } = await ordersServices.addOrderItems(ordersData)(orderData, userId);

      res.status(201).send(order);
    })
  )

  // @desc GET All orders of All users
  // @route GET /orders
  // @access Private - Admin only
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const { search = '', sort = 'sort=order_date desc' } = req.query;
      let { pageSize = paging.DEFAULT_ORDER_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_ORDER_PAGESIZE) pageSize = paging.MAX_ORDER_PAGESIZE;
      if (+pageSize < paging.MIN_ORDER_PAGESIZE) pageSize = paging.MIN_ORDER_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;
      const { orders } = await ordersServices.getALLOrders(ordersData)(
        search,
        sort,
        +page,
        +pageSize
      );

      res.status(200).send(orders);
    })
  )
  // @desc GET All logged in user orders
  // @route GET /orders/myorders
  // @access Private - admin or user who made the order
  .get(
    '/myorders',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const { userId, role } = req.user;
      const { search = '', sort = 'sort=order_date desc' } = req.query;
      let { pageSize = paging.DEFAULT_ORDER_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_ORDER_PAGESIZE) pageSize = paging.MAX_ORDER_PAGESIZE;
      if (+pageSize < paging.MIN_ORDER_PAGESIZE) pageSize = paging.MIN_ORDER_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { orders } = await ordersServices.getALLOrdersByUser(ordersData)(
        +userId,
        role,
        search,
        sort,
        +page,
        +pageSize
      );

      res.status(200).send(orders);
    })
  )
  // @desc GET order by ID
  // @route GET /orders/:orderId
  // @access Private - admin or user who made the order
  .get(
    '/:orderId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { role, userId } = req.user;
      const { orderId } = req.params;
      const { error, order } = await ordersServices.getOrderById(ordersData)(
        +orderId,
        role,
        +userId
      );

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
    })
  )

  // @desc Update order to delivered
  // @route PUT /orders/:id/deliver
  // @access Private - Admin only
  .put(
    '/:orderId/deliver',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { orderId } = req.params;
      const { error, order } = await ordersServices.updateOrderToDelivered(ordersData)(+orderId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The order is not found.'
        });
      } else {
        res.status(200).send(order);
      }
    })
  )

  // @desc Update order to paid
  // @route PUT /orders/:id/pay
  // @access Private

  .put(
    '/:orderId/pay',
    authMiddleware,
    loggedUserGuard,
    validateBody('order', updateOrderToPaidSchema), // TO DO
    errorHandler(async (req: Request, res: Response) => {
      const { role, userId } = req.user;
      const { orderId } = req.params;
      const paymentData = req.body;
      const { error, order } = await ordersServices.updateOrderToPaid(ordersData)(
        +orderId,
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
    })
  );

export default ordersController;
