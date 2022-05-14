import WishType from './WishType';

interface WishListData {
  getAllWishListRecords: (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => Promise<WishType>;
  getById: (wishListId: number) => Promise<WishType>;
  getBy: (column: string, value: string | number, userId: number) => Promise<WishType>;
  create: (productId: number, userId: number) => Promise<WishType>;
  remove: (wishListId: number) => Promise<any>;
}
export default WishListData;
