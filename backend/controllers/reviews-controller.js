import express from 'express';
import reviewsData from '../data/reviews-data.js';
import productsData from '../data/products-data.js';
import usersData from '../data/users-data.js';
// import ordersData from '../data/orders-data.js';
import validateBody from '../middleware/validate-body.js';
import reviewsService from '../services/reviews-service.js';
import errors from '../constants/service-errors.js';
import { authMiddleware } from '../authentication/auth.middleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
// import rolesEnum from '../common/roles.enum.js';
import errorHandler from '../middleware/errorHandler.js';
import createReviewSchema from '../validator/create-review-schema.js';
import updateReviewSchema from '../validator/update-review-schema.js';
import { paging } from '../constants/constants.js';
import voteReviewSchema from '../validator/vote-review-schema.js';

const reviewsController = express.Router();

// To DO implement only a user who has purchased and received the product is allowed to write a review
reviewsController
  // @desc CREATE Product review
  // @route POST/reviews/:productId
  // @access Private - logged users who have purchased and received the product
  .post(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    validateBody('review', createReviewSchema),
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const { content, rating, title } = req.body;
      const { userId } = req.user;

      const { error, result } = await reviewsService.createReview(
        productsData,
        reviewsData
        // ordersData,
        // usersData
      )(content, +userId, +productId, +rating, title);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      }
      // else if (error === errors.OPERATION_NOT_PERMITTED) {
      //   res.status(403).send({
      //     message: `Only a user who has purchased and received the product is allowed to write a review.`
      //   });
      // }
      else if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: `User with userId ${userId} has already reviewed the product.`
        });
      } else {
        res.status(201).send(result);
      }
    })
  )
  // @desc GET All Product reviews
  // @route GET/reviews/:productId
  // @access Public
  .get(
    '/:productId',
    // errorHandler(
    async (req, res) => {
      const { productId } = req.params;
      const { order = 'DESC' } = req.query;
      let { pageSize = paging.DEFAULT_REVIEWS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_REVIEWS_PAGESIZE) pageSize = paging.MAX_REVIEWS_PAGESIZE;
      if (+pageSize < paging.MIN_REVIEWS_PAGESIZE) pageSize = paging.MIN_REVIEWS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, result } = await reviewsService.getAllReviews(reviewsData, productsData)(
        +productId,
        order,
        +page,
        +pageSize
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    }
  )
  // )
  // // get review by ID
  // .get(
  //   '/:reviewId',
  //   authMiddleware,
  //   loggedUserGuard,
  //   errorHandler(async (req, res) => {
  //     const { reviewId } = req.params;
  //     const { userId, role } = req.user;

  //     const { error, result } = await reviewsService.readReview(reviewsData)(
  //       +reviewId,
  //       +userId,
  //       role
  //     );

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The review is not found.'
  //       });
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  // )

  // @desc EDIT Product review
  // @route PUT/:reviewId
  // @access Private - logged users who have created the review or Admin
  .put(
    '/:reviewId',
    authMiddleware,
    loggedUserGuard,
    validateBody('review', updateReviewSchema),
    async (req, res) => {
      const { content, rating, title } = req.body;
      const { reviewId } = req.params;
      const { userId, role } = req.user;

      const { error, result } = await reviewsService.updateReview(reviewsData)(
        content,
        +reviewId,
        +userId,
        role,
        +rating,
        title
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The review is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    }
  )

  // @desc DELETE Product review
  // @route DELETE/:reviewId
  // @access Private - logged users who have created the review or Admin
  .delete(
    '/:reviewId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const { userId, role } = req.user;
      const { reviewId } = req.params;

      const { error, result } = await reviewsService.deleteReview(reviewsData)(
        +reviewId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The review is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // @desc CREATE Product review reaction (like)
  // @route POST/reviews/:reviewId/votes
  // @access Private - Logged users only
  .post(
    '/:reviewId/votes',
    authMiddleware,
    loggedUserGuard,
    validateBody('vote', voteReviewSchema),
    errorHandler(async (req, res) => {
      const { reactionName } = req.body;
      const { reviewId } = req.params;
      const { userId, role } = req.user;

      const { result } = await reviewsService.voteReview(reviewsData)(
        reactionName,
        +reviewId,
        +userId,
        role
      );
      res.status(201).send(result);
    })
  );

// .delete(
//   '/:reviewId/votes',
//   authMiddleware,
//   loggedUserGuard,
//   errorHandler(async (req, res) => {
//     // const { reactionId } = req.body;
//     const { reviewId } = req.params;
//     const { role } = req.user;
//     const id = role === rolesEnum.admin ? req.body.userId : req.user.userId;

//     const { error, result } = await reviewsService.unVoteReview(reviewVoteData, usersData)(
//       +reviewId,
//       +id,
//       role
//     );

//     if (error === errors.RECORD_NOT_FOUND) {
//       res.status(403).send({
//         message: 'Review is not found.'
//       });
//     } else {
//       res.status(200).send(result);
//     }
//   })
// )

export default reviewsController;
