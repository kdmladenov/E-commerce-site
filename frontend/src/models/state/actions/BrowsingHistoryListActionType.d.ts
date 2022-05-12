import HistoryType from '../../HistoryType';

interface BrowsingHistoryListActionRequest {
  type: 'BROWSING_HISTORY_LIST_REQUEST';
}

interface BrowsingHistoryListActionSuccess {
  type: 'BROWSING_HISTORY_LIST_SUCCESS';
  payload: HistoryType[];
}
interface BrowsingHistoryListActionError {
  type: 'BROWSING_HISTORY_LIST_FAIL';
  payload: string;
}

type BrowsingHistoryListActionType =
  | BrowsingHistoryListActionRequest
  | BrowsingHistoryListActionSuccess
  | BrowsingHistoryListActionError;

export default BrowsingHistoryListActionType;
