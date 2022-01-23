import errors from '../constants/service-errors.js';

const getAllUserWishList =
  (productsData) => async (userId, search, filter, sort, pageSize, page) => {
    const result = await productsData.getAllWishListRecords(
      userId,
      search,
      filter,
      sort,
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

const deleteWishListRecord = (wishListData) => async (productId, userId) => {
  const existingWish = await wishListData.getBy('product_id', productId, userId);

  if (!existingWish) {
    return {
      error: errors.RECORD_NOT_FOUND,
      wishListRecord: null
    };
  }

  await wishListData.remove(existingWish.wishListId);

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
