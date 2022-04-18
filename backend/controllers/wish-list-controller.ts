import express, { Request, Response } from 'express';

import wishListServices from '../services/wish-list-services.js';

import wishListData from '../data/wish-list-data.js';

import errorHandler from '../middleware/errorHandler.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import rolesEnum from '../constants/roles.enum.js';
import { paging } from '../constants/constants.js';
import errors from '../constants/service-errors.js';

const wishListController = express.Router();

wishListController
  // @desc GET All wishList incl search, sort, paging
  // @route GET /wishlist
  // @access Private - logged user
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const userId = req.user.userId;

      const { search = '', filter = '', sort = 'dateCreated desc' } = req.query;

      let { pageSize = paging.DEFAULT_WISH_LIST_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;
      if (+pageSize > paging.MAX_WISH_LIST_PAGESIZE) pageSize = paging.MAX_WISH_LIST_PAGESIZE;
      if (+pageSize < paging.MIN_WISH_LIST_PAGESIZE) pageSize = paging.MIN_WISH_LIST_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const wishList = await wishListServices.getAllUserWishList(wishListData)(
        +userId,
        search,
        filter,
        sort,
        +pageSize,
        +page
      );

      res.status(200).send(wishList);
    })
  )

  // @desc CREATE wishlist by ID
  // @route POST /wishlist/:wishlistId
  // @access Private - logged user
  .post(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { productId } = req.params;
      const userId = req.user.userId;
      const { error, wishList } = await wishListServices.createWishListRecord(wishListData)(
        productId,
        userId
      );

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'You have already added this product in your wishlist.'
        });
      } else {
        res.status(201).send(wishList);
      }
    })
  )
  // @desc DELETE wishlist
  // @route DELETE /wishlist/:id
  // @access Private - logged user
  .delete(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { productId } = req.params;
      const { userId } = req.user;
      const { error, wishListRecord } = await wishListServices.deleteWishListRecord(wishListData)(
        +productId,
        +userId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A product with this id is not found in your wishlist!'
        });
      } else {
        res.status(200).send(wishListRecord);
      }
    })
  );

export default wishListController;
