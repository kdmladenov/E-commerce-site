import errors from '../constants/service-errors.js';

const getAllUserWishList =
  (productsData) =>
  async (userId, search, searchBy, sort, order, pageSize, page, dateRangeLow, dateRangeHigh) => {
    const result = await productsData.getAllWishListRecords(
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

const createWishListRecord = (wishListData) => async (productId, userId) => {
  const existingRecord = await wishListData.getBy('product_id', productId, userId);

  if (existingRecord) {
    return {
      error: errors.DUPLICATE_RECORD,
      wishList: null
    };
  }

  return {
    error: null,
    wishList: await wishListData.create(productId, userId)
  };
};

const deleteWishListRecord = (wishListData) => async (wishListId) => {
  const existingWish = await wishListData.getById(wishListId);

  if (!existingWish) {
    return {
      error: errors.RECORD_NOT_FOUND,
      wishListRecord: null
    };
  }

  await wishListData.remove(wishListId);

  return {
    error: null,
    wishListRecord: { ...existingWish, isDeleted: 1 }
  };
};

export default {
  getAllUserWishList,
  createWishListRecord,
  deleteWishListRecord
};