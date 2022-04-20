import errors from '../constants/service-errors.js';
import WishListData from '../models/WishListData.js';

const getAllUserWishList =
  (wishListData: WishListData) =>
  async (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => {
    const result = await wishListData.getAllWishListRecords(
      userId,
      search,
      filter,
      sort,
      pageSize,
      page
    );

    return result;
  };

const createWishListRecord =
  (wishListData: WishListData) => async (productId: number, userId: number) => {
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

const deleteWishListRecord =
  (wishListData: WishListData) => async (productId: number, userId: number) => {
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
