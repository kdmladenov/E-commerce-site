import errors from '../constants/service-errors.js';

const getAllUserWishlist =
  (productsData) =>
  async (userId, search, searchBy, sort, order, pageSize, page, dateRangeLow, dateRangeHigh) => {
    const result = await productsData.getAllWishlistRecords(
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

const createWishlistRecord = (wishlistData) => async (productId, userId) => {
  const existingRecord = await wishlistData.getBy('product_id', productId, userId);

  if (existingRecord) {
    return {
      error: errors.DUPLICATE_RECORD,
      wishlist: null
    };
  }

  return {
    error: null,
    wishlist: await wishlistData.create(productId, userId)
  };
};

const deleteWishlistRecord = (wishlistData) => async (wishlistId) => {
  const existingRecord = await wishlistData.getById(wishlistId);

  if (!existingRecord) {
    return {
      error: errors.RECORD_NOT_FOUND,
      wishlistRecord: null
    };
  }

  await wishlistData.remove(wishlistId);

  return {
    error: null,
    wishlistRecord: { ...existingRecord, isDeleted: 1 }
  };
};

export default {
  getAllUserWishlist,
  createWishlistRecord,
  deleteWishlistRecord
};
