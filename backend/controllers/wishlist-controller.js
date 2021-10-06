import express from 'express';
import wishlistData from '../data/wishlist-data.js';
import errors from '../constants/service-errors.js';
import wishlistServices from '../services/wishlist-services.js';
import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';
import rolesEnum from '../constants/roles.enum.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';
import { paging } from '../constants/constants.js';

const wishlistController = express.Router();

wishlistController
  // @desc GET All wishlist incl search, sort, paging
  // @route GET /wishlist
  // @access Private - logged user
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const userId = req.user.userId;

      const {
        search = '',
        searchBy = 'title',
        sort = 'dateCreated',
        order = 'desc',
        dateRangeLow = Date.now(),
        dateRangeHigh = Date.now()
      } = req.query;

      let { pageSize = paging.DEFAULT_WISHLIST_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;
      if (+pageSize > paging.MAX_WISHLIST_PAGESIZE) pageSize = paging.MAX_WISHLIST_PAGESIZE;
      if (+pageSize < paging.MIN_WISHLIST_PAGESIZE) pageSize = paging.MIN_WISHLIST_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;
      if (new Date(dateRangeHigh) > Date.now()) dateRangeHigh = Date.now();
      if (new Date(dateRangeLow) > new Date(dateRangeHigh)) dateRangeLow = dateRangeHigh;

      const wishlist = await wishlistServices.getAllUserWishlist(wishlistData)(
        +userId,
        search,
        searchBy,
        sort,
        order,
        +pageSize,
        +page,
        dateRangeLow,
        dateRangeHigh
      );

      res.status(200).send(wishlist);
    })
  )

  // @desc CREATE wishlist by ID
  // @route POST /wishlist/:wishlistId
  // @access Private - logged user
  .post(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const userId = req.user.userId;
      const { error, wishlist } = await wishlistServices.createWishlistRecord(wishlistData)(
        productId,
        userId
      );

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'You have already added this product in your wishlist.'
        });
      } else {
        res.status(201).send(wishlist);
      }
    })
  )
  // @desc DELETE wishlist
  // @route DELETE /wishlist/:id
  // @access Private - logged user
  .delete(
    '/:wishlistId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { wishlistId } = req.params;
      const { error, wishlistRecord } = await wishlistServices.deleteWishlistRecord(wishlistData)(
        wishlistId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A wishlist with this id is not found!'
        });
      } else {
        res.status(200).send(wishlistRecord);
      }
    })
  );

export default wishlistController;
