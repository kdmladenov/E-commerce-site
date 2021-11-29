import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrowsingHistory, listBrowsingHistory } from '../actions/browsingHistoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import './styles/BrowsingHistoryScreen.css';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  browsingHistorySidebarInput,
  browsingHistorySortSelect,
  productListPageSizeSelect
} from '../constants/inputMaps';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import Tooltip from '../components/Tooltip';

const BrowsingHistoryScreen = () => {
  const dispatch = useDispatch();
  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateVisited desc&',
    filter: [],
    search: ''
  });

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading, browsingHistory, error } = browsingHistoryList;

  const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
  const { success: successDelete } = browsingHistoryDelete;

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listBrowsingHistory(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDelete]);

  const productsToShow = (
    <ul>
      {browsingHistory?.map((historyRecord) => (
        <li className="history_item card" key={historyRecord.productId}>
          <ProductCard
            id={historyRecord.productId}
            title={historyRecord.title}
            image={historyRecord.image}
            price={historyRecord.price}
            rating={historyRecord.rating}
            stockCount={historyRecord.stockCount}
            reviewCount={historyRecord.reviewCount}
            ratingMap={{
              1: historyRecord.starOne || 0,
              2: historyRecord.starTwo || 0,
              3: historyRecord.starThree || 0,
              4: historyRecord.starFour || 0,
              5: historyRecord.starFive || 0
            }}
          />
          <Button
            classes="icon"
            onClick={() => dispatch(deleteBrowsingHistory(historyRecord.historyId))}
          >
            <Tooltip text="Remove">
              <i className="fa fa-times"></i>
            </Tooltip>
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <main className="browsing_history_list_container">
      <Sidebar
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        inputMap={browsingHistorySidebarInput}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : browsingHistory.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="browsing_history_list">
          <div className="header">
            <div className="breadcrumbs_container">
              <Breadcrumbs />
            </div>
            <div className="dropdown_group_container">
              <select
                name="pageSize"
                onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
              >
                <option value="">{`Page size: ${
                  productListPageSizeSelect.find((item) => item.value === endpoint.pageSize).label
                }`}</option>
                {productListPageSizeSelect
                  .filter((size) => size.value !== endpoint.pageSize)
                  .map((size) => (
                    <option key={size.label} value={size.value}>
                      {size.label}
                    </option>
                  ))}
              </select>
              <select
                name="sort"
                onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
              >
                <option value="">{`Sort by: ${
                  browsingHistorySortSelect.find((item) => item.value === endpoint.sort).label
                }`}</option>
                {browsingHistorySortSelect
                  .filter((item) => item.value !== endpoint.sort)
                  .map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {productsToShow}
          <div className="footer">
            {browsingHistory?.length > 0 && (
              <Pagination
                updatePagingQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                totalItems={browsingHistory[0].totalDBItems}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default BrowsingHistoryScreen;
