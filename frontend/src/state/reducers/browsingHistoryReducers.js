import {
  BROWSING_HISTORY_ADD_FAIL,
  BROWSING_HISTORY_ADD_REQUEST,
  BROWSING_HISTORY_ADD_RESET,
  BROWSING_HISTORY_ADD_SUCCESS,
  BROWSING_HISTORY_DELETE_FAIL,
  BROWSING_HISTORY_DELETE_REQUEST,
  BROWSING_HISTORY_DELETE_SUCCESS,
  BROWSING_HISTORY_LIST_FAIL,
  BROWSING_HISTORY_LIST_REQUEST,
  BROWSING_HISTORY_LIST_SUCCESS
} from '../constants/browsingHistoryConstants';

export const browsingHistoryAddReducer = (state = {}, action) => {
  switch (action.type) {
    case BROWSING_HISTORY_ADD_REQUEST:
      return { loading: true };
    case BROWSING_HISTORY_ADD_SUCCESS:
      return { loading: false };
    case BROWSING_HISTORY_ADD_FAIL:
      return { loading: false, error: action.payload };
    case BROWSING_HISTORY_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const browsingHistoryListReducer = (state = { browsingHistory: [] }, action) => {
  switch (action.type) {
    case BROWSING_HISTORY_LIST_REQUEST:
      return { loading: true, browsingHistory: [] };
    case BROWSING_HISTORY_LIST_SUCCESS:
      return { loading: false, browsingHistory: action.payload };
    case BROWSING_HISTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const browsingHistoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BROWSING_HISTORY_DELETE_REQUEST:
      return { loading: true };
    case BROWSING_HISTORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BROWSING_HISTORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
