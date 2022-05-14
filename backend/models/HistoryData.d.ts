import HistoryType from './HistoryType';

interface HistoryData {
  getAllHistory: (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => Promise<HistoryType[]>;
  getById: (historyId: number) => Promise<HistoryType>;
  getBy: (column: string, value: string | number, userId: number) => Promise<HistoryType>;
  create: (productId: number, userId: number) => Promise<HistoryType>;
  remove: (historyId: number) => Promise<any>;
  updateDate: (historyId: number) => Promise<any>;
}

export default HistoryData;
