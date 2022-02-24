import express from 'express';

import productsServices from '../services/products-services.js';

import productsData from '../data/products-data.js';
import productsImagesData from '../data/product-images-data.js';
import featuresData from '../data/features-data.js';
import specificationsData from '../data/specifications-data.js';

import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import updateProductSchema from '../validator/update-product-schema.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import createProductSchema from '../validator/create-product-schema.js';
import createFeatureSchema from '../validator/create-feature-schema.js';
import updateFeatureSchema from '../validator/update-feature-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';

const productsController = express.Router();

productsController
  // @desc GET All products incl search, sort, paging
  // @route GET /products
  // @access Public
  .get(
    '/',
    errorHandler(async (req, res) => {
      const { search = '', filter = '', sort = 'sort=price asc', role = 'basic' } = req.query;

      let { pageSize = paging.DEFAULT_PRODUCT_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_PRODUCT_PAGESIZE) pageSize = paging.MAX_PRODUCT_PAGESIZE;
      if (+pageSize < paging.MIN_PRODUCT_PAGESIZE) pageSize = paging.MIN_PRODUCT_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const product = await productsServices.getAllProducts(productsData)(
        search,
        filter,
        sort,
        +pageSize,
        +page,
        role
      );

      res.status(200).send(product);
    })
  )
  // @desc GET Products by ID
  // @route GET /products/:productId
  // @access Public
  .get(
    '/:productId',
    errorHandler(async (req, res) => {
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
    })
  )
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
        // } else if (error === errors.DUPLICATE_RECORD) {
        //   res.status(409).send({
        //     message: 'Another product with this title already exist.'
        //   });
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

      // Duplicate record removed, but could be implemented again
      // if (error === errors.DUPLICATE_RECORD) {
      //   res.status(409).send({
      //     message: 'A product with same title already exists.'
      //   });
      // } else {
      res.status(201).send(product);
      // }
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
  // @desc UN-DELETE product
  // @route UN-DELETE /products/:id
  // @access Private - Admin only
  .patch(
    '/:productId/restore',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const { error, product } = await productsServices.restoreProduct(productsData)(+productId);
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this id is not found!'
        });
      } else {
        res.status(200).send(product);
      }
    })
  )
  // @desc UPLOAD product's image
  // @route POST /products/images/upload
  // @access Private - Admin only
  .post(
    '/images/upload',
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
  // @desc ADD product's image
  // @route POST /products/:productId/image
  // @access Private - Admin only
  .post(
    '/:productId/images',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    // validateBody('productImage', addProductImageSchema),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const { imageUrl } = req.body;
      const { error, result } = await productsServices.addProductImage(
        productsImagesData,
        productsData
      )(+productId, imageUrl);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )
  // @desc GET ALL product's images
  // @route GET /products/:productId/image
  // @access Public
  .get(
    '/:productId/images',
    errorHandler(async (req, res) => {
      const { productId } = req.params;

      const { error, result } = await productsServices.getAllProductImages(
        productsImagesData,
        productsData
      )(+productId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // @desc DELETE product image
  // @route DELETE /products/:productImageId/images
  // @access Private - Admin only
  .delete(
    '/:productImageId/images',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { productImageId } = req.params;
      const { error, deletedImage } = await productsServices.deleteProductImage(productsImagesData)(
        +productImageId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product image with this id is not found!'
        });
      } else {
        res.status(200).send(deletedImage);
      }
    })
  )
  // )
  // @desc SET Product image as main
  // @route PUT /products/:productImageId/images/main
  // @access Private - Admin only
  .put(
    '/:productImageId/images/main',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { productImageId } = req.params;

      const { error, newMainImage } = await productsServices.setProductImageAsMain(
        productsImagesData
      )(+productImageId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product image is not found.'
        });
      } else {
        res.status(200).send(newMainImage);
      }
    })
  )
  // @desc GET All Products Features by productId
  // @route GET /products/:productId/features
  // @access Public
  .get(
    '/:productId/features',
    errorHandler(async (req, res) => {
      const { productId } = req.params;

      const { error, productFeatures } = await productsServices.getProductFeaturesById(
        productsData,
        featuresData
      )(productId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(200).send(productFeatures);
      }
    })
  )
  // @desc CREATE Product Feature by productId
  // @route POST /products/:productId/features
  // @access Private - Admin only
  .post(
    '/:productId/features',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    validateBody('feature', createFeatureSchema),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const data = req.body;

      const { error, productFeature } = await productsServices.createProductFeature(
        productsData,
        featuresData
      )(+productId, data);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(201).send(productFeature);
      }
    })
  )
  // @desc EDIT Product Feature by featureId
  // @route PUT /products/:featureId/features
  // @access Private - Admin only
  .put(
    '/:featureId/features',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    validateBody('feature', updateFeatureSchema),
    errorHandler(async (req, res) => {
      const { featureId } = req.params;
      const data = req.body;

      const { error, updatedProductFeature } = await productsServices.updateProductFeature(
        featuresData
      )(+featureId, data);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product feature with this number is not found!'
        });
      } else {
        res.status(200).send(updatedProductFeature);
      }
    })
  )
  // @desc DELETE Product Feature by featureId
  // @route DELETE /products/:featureId/features
  // @access Private - Admin only
  .delete(
    '/:featureId/features',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { featureId } = req.params;

      const { error, productFeature } = await productsServices.deleteProductFeature(featuresData)(
        +featureId
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product feature with this number is not found!'
        });
      } else {
        res.status(200).send(productFeature);
      }
    })
  )
  // @desc CREATE Product Specifications by productId
  // @route POST /products/:productId/specifications
  // @access Private - Admin only
  .post(
    '/:productId/specifications',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    // TO DO: createSpecificationsSchema
    // validateBody('specification', createSpecificationsSchema),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const data = req.body;

      const { error, productSpecification } = await productsServices.createProductSpecification(
        productsData,
        specificationsData
      )(+productId, data);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this number is not found!'
        });
      } else {
        res.status(201).send(productSpecification);
      }
    })
  )
  // @desc EDIT Product Specifications by specificationId
  // @route PUT /products/:specificationId/specifications
  // @access Private - Admin only
  .put(
    '/:specificationId/specifications',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    // TO DO: updateSpecificationsSchema
    // validateBody('specification', updateSpecificationsSchema),
    errorHandler(async (req, res) => {
      const { specificationId } = req.params;
      const data = req.body;

      const { error, productSpecification } = await productsServices.updateProductSpecification(
        specificationsData
      )(+specificationId, data);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product specification with this number is not found!'
        });
      } else {
        res.status(200).send(productSpecification);
      }
    })
  )
  // @desc DELETE Product Specifications by specificationId
  // @route DELETE /products/:specificationId/specifications
  // @access Private - Admin only
  .delete(
    '/:specificationId/specifications',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { specificationId } = req.params;

      const { error, deletedProductSpecification } =
        await productsServices.deleteProductSpecification(specificationsData)(+specificationId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product specification with this number is not found!'
        });
      } else {
        res.status(200).send(deletedProductSpecification);
      }
    })
  );

export default productsController;
