import express from 'express';
import productsData from '../data/products-data.js';
import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import errors from '../constants/service-errors.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import createProductSchema from '../validator/create-product-schema.js';
import productsServices from '../services/products-services.js';
import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';
import rolesEnum from '../constants/roles.enum.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';
import { paging } from '../constants/constants.js';
import updateProductSchema from '../validator/update-product-schema.js';
import uploadImage from '../middleware/upload-image.js';

const productsController = express.Router();

productsController
  // get all products - search, sort, paging
  .get(
    '/',
    // authMiddleware,
    // loggedUserGuard,
    // errorHandler(
      async (req, res) => {
      const { search = '', searchBy = 'title', sort = 'title', order = 'asc' } = req.query;
      // const { role } = req.user;

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
        'admin'
      );

      res.status(200).send(product);
    })
  // )
  // get by id
  .get(
    '/:productId',
    // authMiddleware,
    // loggedUserGuard,
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      // const { role } = req.user;

      const { error, product } = await productsServices.getProductById(productsData)(
        productId,
        'admin'
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(200).send(product);
      }
    })
  )
  // change product
  .put(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    validateBody('product', updateProductSchema),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const data = req.body;

      const { error, result } = await productsServices.updateProduct(productsData)(
        +productId,
        data
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'Another product with this title and/or isbn already exist.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

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
  )
  // delete product
  .delete(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const { error, product } = await productsServices.deleteProduct(productsData)(productId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this id is not found!'
        });
      } else {
        res.status(200).send(product);
      }
    })
  )
  // Update/Upload product image
  .put(
    '/:productId/image',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    uploadImage.single('image'),
    validateFile('uploads', uploadFileSchema),
    errorHandler(async (req, res) => {
      const { path } = req.file;
      const { productId } = req.params;
      console.log(path, productId);
      const { error, _ } = await productsServices.imageChange(productsData)(
        path.replace(/\\/g, '/'),
        +productId
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(200).send({ message: 'The product image is changed' });
      }
    })
  );

export default productsController;
