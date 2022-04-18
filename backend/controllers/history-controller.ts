import express, { Request, Response } from 'express';

import historyServices from '../services/history-services.js';

import historyData from '../data/history-data.js';

import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';

const historyController = express.Router();

historyController
  // @desc GET All history incl search, sort, paging
  // @route GET /history
  // @access Private - logged user
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const userId = req.user.userId;
      const { search = '', filter = '', sort = 'sort=dateVisited desc' } = req.query;

      let { pageSize = paging.DEFAULT_HISTORY_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;
      if (+pageSize > paging.MAX_HISTORY_PAGESIZE) pageSize = paging.MAX_HISTORY_PAGESIZE;
      if (+pageSize < paging.MIN_HISTORY_PAGESIZE) pageSize = paging.MIN_HISTORY_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const history = await historyServices.getAllUserHistory(historyData)(
        +userId,
        search,
        filter,
        sort,
        +pageSize,
        +page
      );

      res.status(200).send(history);
    })
  )

  // @desc CREATE History by ID
  // @route POST /history/:historyId
  // @access Private - logged user
  .post(
    '/:productId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { productId } = req.params;
      const userId = req.user.userId;

      const { history } = await historyServices.createHistory(historyData)(+productId, +userId);

      res.status(201).send(history);
    })
  )
  // @desc DELETE history
  // @route DELETE /history/:id
  // @access Private - logged user and only the original creator
  .delete(
    '/:historyId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { historyId } = req.params;
      const userId = req.user.userId;
      const { error, historyRecord } = await historyServices.deleteHistoryRecord(historyData)(
        +historyId,
        +userId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A history with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this history record`
        });
      } else {
        res.status(200).send(historyRecord);
      }
    })
  );

export default historyController;
