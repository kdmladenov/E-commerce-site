import WishType from '../../WishType';

interface WishListItemsActionRequest {
  type: 'WISH_ITEMS_LIST_REQUEST';
}
interface WishListItemsActionSuccess {
  type: 'WISH_ITEMS_LIST_SUCCESS';
  payload: WishType[];
}
interface WishListItemsActionError {
  type: 'WISH_ITEMS_LIST_FAIL';
  payload: string;
}

type WishListItemsActionType =
  | WishListItemsActionRequest
  | WishListItemsActionSuccess
  | WishListItemsActionError;

export default WishListItemsActionType;
