import express, { Request, Response } from 'express';

import answersServices from '../services/answers-services.js';

import answersData from '../data/answers-data.js';
import questionsData from '../data/questions-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import createAnswerSchema from '../validator/create-answer-schema.js';
import updateAnswerSchema from '../validator/update-answer-schema.js';

import errors from '../constants/service-errors.js';
import RequestQuery from '../models/RequestQuery.js';

const answersController = express.Router();

answersController
  // @desc Create answer of question
  // @route P/answers/:questionId
  // @access Private - logged users
  .post(
    '/:questionId',
    authMiddleware,
    loggedUserGuard,
    validateBody('answer', createAnswerSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { questionId } = req.params;
      const { contentAnswer } = req.body;
      const { userId } = req.user;

      const { error, answer } = await answersServices.createAnswer(questionsData, answersData)(
        contentAnswer,
        +userId,
        +questionId
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The question is not found.'
        });
      } else {
        res.status(201).send(answer);
      }
    })
  )

  // @desc GET All question answers
  // @route GET/answers/:questionId
  // @access Public
  .get(
    '/:questionId',
    errorHandler(async (req: Request<{ questionId: number }, {}, {}, RequestQuery>, res: Response) => {
      const { questionId } = req.params;

      const { error, result } = await answersServices.getAllAnswers(
        answersData,
        questionsData
      )(+questionId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The question is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc EDIT answer
  // @route PUT/:answerId
  // @access Private - logged users who have created the answer or Admin
  .put(
    '/:answerId',
    authMiddleware,
    loggedUserGuard,
    validateBody('answer', updateAnswerSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { contentAnswer } = req.body;
      const { answerId } = req.params;
      const { userId, role } = req.user;

      const { error, result } = await answersServices.updateAnswer(answersData)(
        contentAnswer,
        +answerId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The answer is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this answer`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc DELETE question answer
  // @route DELETE/:answerId
  // @access Private - logged users who have created the answer or Admin
  .delete(
    '/:answerId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId, role } = req.user;
      const { answerId } = req.params;

      const { error, result } = await answersServices.deleteAnswer(answersData)(
        +answerId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The answer is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this answer`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );

export default answersController;
