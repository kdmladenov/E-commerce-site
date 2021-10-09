import errors from '../constants/service-errors.js';

const getAllUserHistory =
  (productsData) =>
  async (userId, search, searchBy, sort, order, pageSize, page, dateRangeLow, dateRangeHigh) => {
    const result = await productsData.getAllHistory(
      userId,
      search,
      searchBy,
      sort,
      order,
      pageSize,
      page
    );

    return result;
  };

const createHistory = (historyData) => async (productId, userId) => {
  const existingRecord = await historyData.getBy('product_id', productId, userId);

  if (existingRecord) {
    await historyData.remove(existingRecord.historyId);
  }

  return {
    error: null,
    history: await historyData.create(productId, userId)
  };
};

const deleteHistoryRecord = (historyData) => async (historyId, userId) => {
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
