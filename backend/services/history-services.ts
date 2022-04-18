import errors from '../constants/service-errors.js';
import HistoryData from '../models/HistoryData.js';

const getAllUserHistory =
  (historyData: HistoryData) =>
  async (
    userId: number,
    search: string,
    filter: string,
    pageSize: number,
    page: number,
    sort: string
  ) => {
    const result = await historyData.getAllHistory(userId, search, filter, pageSize, page, sort);

    return result;
  };

const createHistory = (historyData: HistoryData) => async (productId: number, userId: number) => {
  const existingRecord = await historyData.getBy('product_id', productId, userId);

  if (existingRecord) {
    await historyData.updateDate(existingRecord.historyId);

    return {
      error: null,
      history: await historyData.getById(existingRecord.historyId)
    };
  } else {
    return {
      error: null,
      history: await historyData.create(productId, userId)
    };
  }
};

const deleteHistoryRecord =
  (historyData: HistoryData) => async (historyId: number, userId: number) => {
    const existingRecord = await historyData.getById(historyId);

    if (!existingRecord) {
      return {
        error: errors.RECORD_NOT_FOUND,
        historyRecord: null
      };
    }

    // checks if the user is the original history record creator
    if (existingRecord.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        product: null
      };
    }

    await historyData.remove(historyId);

    return {
      error: null,
      historyRecord: { ...existingRecord, isDeleted: 1 }
    };
  };

export default {
  getAllUserHistory,
  createHistory,
  deleteHistoryRecord
};
