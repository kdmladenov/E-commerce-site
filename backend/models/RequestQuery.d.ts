interface RequestQuery {
  productId: number;
  search: string;
  filter: string | string[];
  sort: string;
  page: number;
  pageSize: number;
  ratingMin: number;
  ratingMax: number;
  role: string;
}

export default RequestQuery;
