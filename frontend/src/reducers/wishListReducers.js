import {
  WISH_LIST_ADD_FAIL,
  WISH_LIST_ADD_REQUEST,
  WISH_LIST_ADD_RESET,
  WISH_LIST_ADD_SUCCESS
} from '../constants/wishlLstConstants';

export const wishListAddReducer = (state = {}, action) => {
  switch (action.type) {
    case WISH_LIST_ADD_REQUEST:
      return { loading: true };
    case WISH_LIST_ADD_SUCCESS:
      return { loading: false };
    case WISH_LIST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case WISH_LIST_ADD_RESET:
      return {};
    default:
      return state;
  }
};
