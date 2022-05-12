interface WishListDeleteActionRequest {
  type: 'WISH_LIST_DELETE_REQUEST';
}
interface WishListDeleteActionSuccess {
  type: 'WISH_LIST_DELETE_SUCCESS';
}
interface WishListDeleteActionError {
  type: 'WISH_LIST_DELETE_FAIL';
  payload: string;
}

type WishListDeleteActionType =
  | WishListDeleteActionRequest
  | WishListDeleteActionSuccess
  | WishListDeleteActionError;

export default WishListDeleteActionType;
