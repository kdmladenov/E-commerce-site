interface WishListAddActionRequest {
  type: 'WISH_LIST_ADD_REQUEST';
}

interface WishListAddActionSuccess {
  type: 'WISH_LIST_ADD_SUCCESS';
}
interface WishListAddActionError {
  type: 'WISH_LIST_ADD_FAIL';
  payload: string;
}
interface WishListAddActionReset {
  type: 'WISH_LIST_ADD_RESET';
}

type WishListAddActionType =
  | WishListAddActionRequest
  | WishListAddActionSuccess
  | WishListAddActionError
  | WishListAddActionReset;

export default WishListAddActionType;
