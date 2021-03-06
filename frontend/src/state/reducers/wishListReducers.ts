import WishListDeleteActionType from '../../models/state/actions/WishLisDeleteActionType';
import WishListItemsActionType from '../../models/state/actions/WishLisItemsActionType';
import WishListAddActionType from '../../models/state/actions/WishListAddActionType';
import {
  WISH_ITEMS_LIST_FAIL,
  WISH_ITEMS_LIST_REQUEST,
  WISH_ITEMS_LIST_SUCCESS,
  WISH_LIST_ADD_FAIL,
  WISH_LIST_ADD_REQUEST,
  WISH_LIST_ADD_RESET,
  WISH_LIST_ADD_SUCCESS,
  WISH_LIST_DELETE_FAIL,
  WISH_LIST_DELETE_REQUEST,
  WISH_LIST_DELETE_SUCCESS
} from '../constants/wishListConstants';

export const wishListAddReducer = (state = {}, action: WishListAddActionType) => {
  switch (action.type) {
    case WISH_LIST_ADD_REQUEST:
      return { loading: true };
    case WISH_LIST_ADD_SUCCESS:
      return { loading: false, success: true };
    case WISH_LIST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case WISH_LIST_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const wishListItemsReducer = (state = { wishList: [] }, action: WishListItemsActionType) => {
  switch (action.type) {
    case WISH_ITEMS_LIST_REQUEST:
      return { loading: true, wishList: [] };
    case WISH_ITEMS_LIST_SUCCESS:
      return { loading: false, wishList: action.payload };
    case WISH_ITEMS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wishListDeleteReducer = (state = {}, action: WishListDeleteActionType) => {
  switch (action.type) {
    case WISH_LIST_DELETE_REQUEST:
      return { loading: true };
    case WISH_LIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WISH_LIST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
