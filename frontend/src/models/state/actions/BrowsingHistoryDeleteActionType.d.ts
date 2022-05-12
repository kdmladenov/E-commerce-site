
interface BrowsingHistoryDeleteActionRequest {
  type: 'BROWSING_HISTORY_DELETE_REQUEST';
}

interface BrowsingHistoryDeleteActionSuccess {
  type: 'BROWSING_HISTORY_DELETE_SUCCESS';
}
interface BrowsingHistoryDeleteActionError {
  type: 'BROWSING_HISTORY_DELETE_FAIL';
  payload: string;
}

type BrowsingHistoryDeleteActionType =
  | BrowsingHistoryDeleteActionRequest
  | BrowsingHistoryDeleteActionSuccess
  | BrowsingHistoryDeleteActionError;

export default BrowsingHistoryDeleteActionType;
