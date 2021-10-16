import express from 'express';
import questionsData from '../data/questions-data.js';
import answersData from '../data/answers-data.js';
import productsData from '../data/products-data.js';
import validateBody from '../middleware/validate-body.js';
import questionsService from '../services/questions-service.js';
import errors from '../constants/service-errors.js';
import { authMiddleware } from '../authentication/auth.middleware.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
// import rolesEnum from '../common/roles.enum.js';
import errorHandler from '../middleware/errorHandler.js';
import createQuestionSchema from '../validator/create-question-schema.js';
import updateQuestionSchema from '../validator/update-question-schema.js';
import { paging } from '../constants/constants.js';

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
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const { questionContent } = req.body;
      const { userId } = req.user;

      const { error, result } = await questionsService.createQuestion(productsData, questionsData)(
        questionContent,
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
    // errorHandler(
      async (req, res) => {
      const { productId } = req.params;

      const { error, result } = await questionsService.getAllQuestions(
        questionsData,
        answersData,
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
  // )

  // // @desc GET Single Product question by ID
  // // @route GET/questions/:questionId
  // // @access Public
  // .get(
  //   '/:questionId',
  //   errorHandler(async (req, res) => {
  //     const { questionId } = req.params;

  //     const { error, result } = await questionsService.getQuestionById(questionsData)(+questionId);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The question is not found.'
  //       });
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  // )

  // @desc EDIT Product question
  // @route PUT/:questionId
  // @access Private - logged users who have created the question or Admin
  .put(
    '/:questionId',
    authMiddleware,
    loggedUserGuard,
    validateBody('question', updateQuestionSchema),
    errorHandler(async (req, res) => {
      const { questionContent } = req.body;
      const { questionId } = req.params;
      const { userId, role } = req.user;

      const { error, result } = await questionsService.updateQuestion(questionsData)(
        questionContent,
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
    errorHandler(async (req, res) => {
      const { userId, role } = req.user;
      const { questionId } = req.params;

      const { error, result } = await questionsService.deleteQuestion(questionsData)(
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

export default questionsController;
