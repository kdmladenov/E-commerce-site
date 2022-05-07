interface BrowsingHistoryAddActionRequest {
  type: 'BROWSING_HISTORY_ADD_REQUEST';
}

interface BrowsingHistoryAddActionSuccess {
  type: 'BROWSING_HISTORY_ADD_SUCCESS';
}
interface BrowsingHistoryAddActionError {
  type: 'BROWSING_HISTORY_ADD_FAIL';
  payload: string;
}
interface BrowsingHistoryAddActionReset {
  type: 'BROWSING_HISTORY_ADD_RESET';
}

type BrowsingHistoryAddActionType =
  | BrowsingHistoryAddActionRequest
  | BrowsingHistoryAddActionSuccess
  | BrowsingHistoryAddActionError
  | BrowsingHistoryAddActionReset;

export default BrowsingHistoryAddActionType;
