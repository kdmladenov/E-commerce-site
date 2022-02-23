const defaultEndpoint = {
  productListScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    filter: [],
    search: ''
  },
  wishListScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateCreated desc&',
    filter: [],
    search: ''
  },
  browsingHistoryScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateVisited desc&',
    filter: [],
    search: ''
  },
  brandStoreScreen: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    filter: [],
    search: ''
  },
  wishList: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    search: ''
  },
  userListAdmin: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=user_id asc&',
    search: ''
  },
  reviews: {
    page: 'page=1&',
    sort: 'sort=dateCreated desc&',
    rating: 'ratingMin=1&ratingMax=5&',
    search: ''
  },
  questionsAndAnswers: {
    page: 'page=1&',
    sort: 'sort=dateCreated desc&',
    search: ''
  },
  productListAdmin: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=productId asc&',
    search: '',
    role: 'role=admin'
  },
  ordersMy: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_id desc&',
    search: ''
  },
  orderListAdmin: {
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_id asc&',
    search: ''
  },
  history: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateVisited desc&',
    filter: [],
    search: ''
  }
};

export default defaultEndpoint;
