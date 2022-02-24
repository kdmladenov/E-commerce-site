import express from 'express';

import reviewsServices from '../services/reviews-services.js';

import reviewsData from '../data/reviews-data.js';
import productsData from '../data/products-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import createReviewSchema from '../validator/create-review-schema.js';
import updateReviewSchema from '../validator/update-review-schema.js';
import voteReviewSchema from '../validator/vote-review-schema.js';

import { paging, review } from '../constants/constants.js';
import errors from '../constants/service-errors.js';

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

      const { error, result } = await reviewsServices.createReview(
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
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const { search = '', sort = 'date_created desc' } = req.query;

      let {
        ratingMin = review.DEFAULT_RATING_MIN,
        ratingMax = review.DEFAULT_RATING_MAX,
        pageSize = paging.DEFAULT_REVIEWS_PAGESIZE,
        page = paging.DEFAULT_PAGE
      } = req.query;

      if (+ratingMax > review.DEFAULT_RATING_MAX) ratingMax = review.DEFAULT_RATING_MAX;
      if (+ratingMin < review.DEFAULT_RATING_MIN) ratingMin = review.DEFAULT_RATING_MIN;
      if (+pageSize > paging.MAX_REVIEWS_PAGESIZE) pageSize = paging.MAX_REVIEWS_PAGESIZE;
      if (+pageSize < paging.MIN_REVIEWS_PAGESIZE) pageSize = paging.MIN_REVIEWS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, result } = await reviewsServices.getAllReviews(reviewsData, productsData)(
        +productId,
        search,
        sort,
        +page,
        +pageSize,
        +ratingMin,
        +ratingMax
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc GET Single Product review by ID
  // @route GET/reviews/:reviewId
  // @access Public
  .get(
    '/:reviewId/review',
    errorHandler(async (req, res) => {
      const { reviewId } = req.params;

      const { error, result } = await reviewsServices.getReviewById(reviewsData)(+reviewId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The review is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc EDIT Product review
  // @route PUT/:reviewId
  // @access Private - logged users who have created the review or Admin
  .put(
    '/:reviewId',
    authMiddleware,
    loggedUserGuard,
    validateBody('review', updateReviewSchema),
    errorHandler(async (req, res) => {
      const { content, rating, title } = req.body;
      const { reviewId } = req.params;
      const { userId, role } = req.user;

      const { error, result } = await reviewsServices.updateReview(reviewsData)(
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
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this review`
        });
      } else {
        res.status(200).send(result);
      }
    })
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

      const { error, result } = await reviewsServices.deleteReview(reviewsData)(
        +reviewId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The review is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this review`
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

      const { result } = await reviewsServices.voteReview(reviewsData)(
        reactionName,
        +reviewId,
        +userId,
        role
      );
      res.status(201).send(result);
    })
  )
  // @desc DELETE Product review vote
  // @route DELETE /reviews/:reviewId/votes
  // @access Private - logged users who have created the review or Admin
  .delete(
    '/:reviewId/votes',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req, res) => {
      const { reviewId } = req.params;
      const { role } = req.user;
      // const userId = role === rolesEnum.admin ? req.body.userId : req.user.userId;
      const userId = req.user.userId;

      const { error, result } = await reviewsServices.unVoteReview(reviewsData)(
        +reviewId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(403).send({
          message: 'The review vote is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this vote`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );

export default reviewsController;
