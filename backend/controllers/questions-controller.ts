import express, { Request, Response } from 'express';

import questionsServices from '../services/questions-services.js';

import questionsData from '../data/questions-data.js';
import productsData from '../data/products-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import createQuestionSchema from '../validator/create-question-schema.js';
import updateQuestionSchema from '../validator/update-question-schema.js';
import voteQuestionSchema from '../validator/vote-question-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import RequestQuery from '../models/RequestQuery.js';

const questionsController = express.Router();

questionsController
  // @desc CREATE Product question
  // @route POST/questions/:productId
  // @access Private - logged users
  .post(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    validateBody('question', createQuestionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { productId } = req.params;
      const { contentQuestion } = req.body;
      const { userId } = req.user;

      const { error, result } = await questionsServices.createQuestion(productsData, questionsData)(
        contentQuestion,
        +userId,
        +productId
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )

  // @desc GET All Product questions
  // @route GET/questions/:productId
  // @access Public
  .get(
    '/:productId',
    errorHandler(async (req: Request<{ productId: number }, {}, {}, RequestQuery>, res: Response) => {
      const { productId } = req.params;
      const { search = '', sort = 'date_created desc' } = req.query;

      let { pageSize = paging.DEFAULT_QUESTIONS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_QUESTIONS_PAGESIZE) pageSize = paging.MAX_QUESTIONS_PAGESIZE;
      if (+pageSize < paging.MIN_QUESTIONS_PAGESIZE) pageSize = paging.MIN_QUESTIONS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, result } = await questionsServices.getAllQuestions(
        questionsData,
        productsData
      )(+productId, search, sort, +page, +pageSize);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The product is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc EDIT Product question
  // @route PUT/:questionId
  // @access Private - logged users who have created the question or Admin
  .put(
    '/:questionId',
    authMiddleware,
    loggedUserGuard,
    validateBody('question', updateQuestionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { contentQuestion } = req.body;
      const { questionId } = req.params;
      const { userId, role } = req.user;

      const { error, result } = await questionsServices.updateQuestion(questionsData)(
        contentQuestion,
        +questionId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The question is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this question`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc DELETE Product question
  // @route DELETE/:questionId
  // @access Private - logged users who have created the question or Admin
  .delete(
    '/:questionId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId, role } = req.user;
      const { questionId } = req.params;

      const { error, result } = await questionsServices.deleteQuestion(questionsData)(
        +questionId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The question is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this question`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // @desc CREATE Product question reaction (like)
  // @route POST/questions/:questionId/votes
  // @access Private - Logged users only
  .post(
    '/:questionId/votes',
    authMiddleware,
    loggedUserGuard,
    validateBody('vote', voteQuestionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { reactionName } = req.body;
      const { questionId } = req.params;
      const { userId, role } = req.user;

      const { result } = await questionsServices.voteQuestion(questionsData)(
        reactionName,
        +questionId,
        +userId
      );
      res.status(201).send(result);
    })
  )
  // @desc DELETE Product question vote
  // @route DELETE /questions/:questionId/votes
  // @access Private - logged users who have created the question or Admin
  .delete(
    '/:questionId/votes',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { questionId } = req.params;
      const { role } = req.user;
      const userId = req.user.userId;

      const { error, result } = await questionsServices.unVoteQuestion(questionsData)(
        +questionId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(403).send({
          message: 'The question vote is not found.'
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

export default questionsController;
