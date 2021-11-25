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
  // @desc GET All products incl search, sort, paging
  // @route GET /products
  // @access Public
  .get(
    '/',
    // errorHandler(
    async (req, res) => {
      const { searchOr = '', searchAnd = '', sort = 'sort=price asc' } = req.query;

      let { pageSize = paging.DEFAULT_PRODUCT_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_PRODUCT_PAGESIZE) pageSize = paging.MAX_PRODUCT_PAGESIZE;
      if (+pageSize < paging.MIN_PRODUCT_PAGESIZE) pageSize = paging.MIN_PRODUCT_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const product = await productsServices.getAllProducts(productsData)(
        searchOr,
        searchAnd,
        sort,
        +pageSize,
        +page,
        'admin' // TO BE FIXED
      );

      res.status(200).send(product);
    }
  )
  // )
  // @desc GET Products by ID
  // @route GET /products/:productId
  // @access Public
  .get(
    '/:productId',
    // errorHandler(
    async (req, res) => {
      const { productId } = req.params;

      const { error, product } = await productsServices.getProductById(productsData)(
        productId,
        'admin' // TO BE FIXED
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(200).send(product);
      }
    }
  )
  // )
  // @desc EDIT Products by ID
  // @route PUT /products/:productId
  // @access Private - Admin only
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
          message: 'Another product with this title already exist.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc CREATE Products by ID
  // @route POST /products/:productId
  // @access Private - Admin only
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
          message: 'A product with same title already exists.'
        });
      } else {
        res.status(201).send(product);
      }
    })
  )
  // @desc DELETE product
  // @route DELETE /products/:id
  // @access Private - Admin only
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
  // @desc UPLOAD / UPDATE product's image - new product without id
  // @route POST /products/image
  // @access Private - Admin only
  .post(
    '/image',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    uploadImage.single('image'),
    validateFile('uploads', uploadFileSchema),
    errorHandler(async (req, res) => {
      const { path } = req.file;

      res.status(201).send(path.replace(/\\/g, '/'));
    })
  )
  // @desc GET Products Features by ID
  // @route GET /products/:productId/features
  // @access Public
  .get(
    '/:productId/features',
    errorHandler(async (req, res) => {
      const { productId } = req.params;

      const { error, productFeatures } = await productsServices.getProductFeaturesById(
        productsData
      )(productId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(200).send(productFeatures);
      }
    })
  );

export default productsController;
