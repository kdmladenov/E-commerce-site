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
import { paging } from '../constants/constants.js';


const productsController = express.Router();

productsController
  // get all products - search, sort, paging
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
      async (req, res) => {
      const { search = '', searchBy = 'title', sort = 'title', order = 'asc' } = req.query;
      const { role } = req.user;

      let { pageSize = paging.DEFAULT_PRODUCT_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_PRODUCT_PAGESIZE) pageSize = paging.MAX_PRODUCT_PAGESIZE;
      if (+pageSize < paging.MIN_PRODUCT_PAGESIZE) pageSize = paging.MIN_PRODUCT_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const product = await productsServices.getAllProducts(productsData)(
        search,
        searchBy,
        sort,
        order,
        +pageSize,
        +page,
        role
      );

      res.status(200).send(product);
    })
  // )
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
