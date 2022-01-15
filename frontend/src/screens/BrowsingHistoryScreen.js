import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrowsingHistory, listBrowsingHistory } from '../actions/browsingHistoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import './styles/BrowsingHistoryScreen.css';
import {
  browsingHistorySortOptionsMap,
  productListPageSizeOptionsMap,
  sidebarInput
} from '../constants/inputMaps';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import Tooltip from '../components/Tooltip';
import HeaderControls from '../components/HeaderControls';
import { getRibbonText } from '../constants/utility-functions';

const defaultEndpoint = {
  page: 'page=1&',
  pageSize: 'pageSize=12&',
  sort: 'sort=dateVisited desc&',
  filter: [],
  search: ''
};

const BrowsingHistoryScreen = () => {
  const dispatch = useDispatch();
  const [endpoint, setEndpoint] = useState(defaultEndpoint);

  const [sidebarInputMap, setSidebarInputMap] = useState(
    sidebarInput(JSON.parse(localStorage.getItem('allHistory')))
  );

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading, browsingHistory, error } = browsingHistoryList;

  const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
  const { success: successDelete } = browsingHistoryDelete;

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listBrowsingHistory(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDelete]);

  useEffect(() => {
    setSidebarInputMap(sidebarInput(JSON.parse(localStorage.getItem('allHistory'))));
  }, [successDelete, sidebarInputMap]);

  return (
    <main className="browsing_history_screen_container">
      <Sidebar
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        inputMap={sidebarInputMap}
        defaultEndpoint={defaultEndpoint}
      />
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="browsing history"
        pageSizeOptionsMap={productListPageSizeOptionsMap}
        sortOptionsMap={browsingHistorySortOptionsMap}
        isGrayBackground={true}
        breadcrumbsPaths={[
          { label: 'Profile', path: `/account/profile` },
          { label: 'Browsing History', path: '' }
        ]}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : browsingHistory.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="browsing_history_list">
          <ul>
            {browsingHistory?.map((historyRecord) => (
              <ProductCard
                product={historyRecord}
                key={historyRecord.productId}
                ribbonText={getRibbonText(historyRecord.productId)}
                deleteBtn={
                  <Button
                    classes="icon"
                    onClick={() => dispatch(deleteBrowsingHistory(historyRecord.historyId))}
                  >
                    <Tooltip text="Remove">
                      <i className="fa fa-times"></i>
                    </Tooltip>
                  </Button>
                }
              />
            ))}
          </ul>
          <div className="footer">
            {browsingHistory?.length > 0 && (
              <Pagination
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
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
