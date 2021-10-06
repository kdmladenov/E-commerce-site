import express from 'express';
import historyData from '../data/history-data.js';
import errors from '../constants/service-errors.js';
import historyServices from '../services/history-services.js';
import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';
import rolesEnum from '../constants/roles.enum.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';
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

      let { pageSize = paging.DEFAULT_HISTORY_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;
      if (+pageSize > paging.MAX_HISTORY_PAGESIZE) pageSize = paging.MAX_HISTORY_PAGESIZE;
      if (+pageSize < paging.MIN_HISTORY_PAGESIZE) pageSize = paging.MIN_HISTORY_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;
      if (new Date(dateRangeHigh) > Date.now()) dateRangeHigh = Date.now();
      if (new Date(dateRangeLow) > new Date(dateRangeHigh)) dateRangeLow = dateRangeHigh;

      const history = await historyServices.getAllUserHistory(historyData)(
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
    errorHandler(async (req, res) => {
      const { productId } = req.params;
      const userId = req.user.userId;
      const { error, history } = await historyServices.createHistory(historyData)(
        productId,
        userId
      );

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'A history with same title already exists.'
        });
      } else {
        res.status(201).send(history);
      }
    })
  )
  // @desc DELETE history
  // @route DELETE /history/:id
  // @access Private - logged user
  .delete(
    '/:historyId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req, res) => {
      const { historyId } = req.params;
      const { error, historyRecord } = await historyServices.deleteHistoryRecord(historyData)(
        historyId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A history with this id is not found!'
        });
      } else {
        res.status(200).send(historyRecord);
      }
    })
  );

export default historyController;
