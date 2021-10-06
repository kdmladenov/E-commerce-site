import { BROWSING_HISTORY_ADD_FAIL, BROWSING_HISTORY_ADD_REQUEST, BROWSING_HISTORY_ADD_RESET, BROWSING_HISTORY_ADD_SUCCESS } from '../constants/browsingHistoryConstants';

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
