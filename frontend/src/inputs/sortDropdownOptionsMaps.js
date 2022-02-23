export const productListSortOptionsMap = [
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' },
  { label: 'Sales: High to Low', value: 'sort=salesCount desc&' },
  { label: 'Popularity: High to Low', value: 'sort=visitedCount desc&' },
  { label: 'Most wished', value: 'sort=wishedCount desc&' },
  { label: 'Avg. Customer Rating', value: 'sort=rating desc&' },
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' }
];

export const browsingHistorySortOptionsMap = [
  { label: 'Visited last', value: 'sort=dateVisited desc&' },
  { label: 'Visited first', value: 'sort=dateVisited asc&' },
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' },
  { label: 'Sales: High to Low', value: 'sort=salesCount desc&' },
  { label: 'Popularity: High to Low', value: 'sort=visitedCount desc&' },
  { label: 'Most wished', value: 'sort=wishedCount desc&' },
  { label: 'Avg. Customer Rating', value: 'sort=rating desc&' }
];

export const reviewsSortOptionsMap = [
  { label: 'Rating: High to Low', value: 'sort=rating desc&' },
  { label: 'Rating: Low to High', value: 'sort=rating asc&' },
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' },
  { label: 'Most liked', value: 'sort=thumbsUp desc&' },
  { label: 'Most disliked', value: 'sort=thumbsDown desc&' }
];

export const questionsSortOptionsMap = [
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' },
  { label: 'Most liked', value: 'sort=thumbsUp desc&' },
  { label: 'Most disliked', value: 'sort=thumbsDown desc&' }
];

export const adminUserListSortOptionsMap = [
  { label: 'User Id: Low to High', value: 'sort=user_id asc&' },
  { label: 'User Id: High to Low', value: 'sort=user_id desc&' },
  { label: 'Name: A to Z', value: 'sort=full_name asc&' },
  { label: 'Name: Z to A', value: 'sort=full_name desc&' }
];

export const adminOrderListSortOptionsMap = [
  { label: 'Ordered last', value: 'sort=order_date desc&' },
  { label: 'Ordered first', value: 'sort=order_date asc&' },
  { label: 'Order Id: Low to High', value: 'sort=order_id asc&' },
  { label: 'Order Id: High to Low', value: 'sort=order_id desc&' },
  { label: 'Total: Low to High', value: 'sort=total_price asc&' },
  { label: 'Total: High to Low', value: 'sort=total_price desc&' }
];

export const adminProductListSortOptionsMap = [
  { label: 'Product Id: Low to High', value: 'sort=productId asc&' },
  { label: 'Product Id: High to Low', value: 'sort=productId desc&' },
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' }
];
