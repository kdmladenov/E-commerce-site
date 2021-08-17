import express from 'express';
import productsData from '../data/products-data.js';
import validateBody from '../middleware/validate-body.js';
import errors from '../constants/service-errors.js';
import createProductSchema from '../validator/create-product-schema.js';
import productsServices from '../services/products-services.js';
import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';
import rolesEnum from '../constants/roles.enum.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

const productsController = express.Router();

productsController
  // create product
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    validateBody('product', createProductSchema),
    errorHandler(async (req, res) => {
      const data = req.body;

      const { error, product } = await productsServices.createProduct(productsData)(data);

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'A product with same name already exists.'
        });
      } else {
        res.status(201).send(product);
      }
    })
  );

export default productsController;
