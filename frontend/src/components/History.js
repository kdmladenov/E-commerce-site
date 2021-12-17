import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBrowsingHistory, listBrowsingHistory } from '../actions/browsingHistoryActions';
import {
  browsingHistorySortOptionsMap,
  productListPageSizeOptionsMap
} from '../constants/inputMaps';
import Button from './Button';
import HeaderControls from './HeaderControls';
import Loader from './Loader';
import Message from './Message';
import ProductCard from './ProductCard';
import './styles/History.css';
import Timeline from './Timeline';

const History = ({ horizontal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  const historyRecordsPagesize = +endpoint.pageSize.replace('pageSize=', '').replace('&', '');
  const historyRecordsCount = browsingHistory?.length && browsingHistory[0].totalDBItems;

  const deleteHistoryItemHandler = (id) => {
    dispatch(deleteBrowsingHistory(id));
  };

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listBrowsingHistory(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDelete]);

  return (
    <section className="browsing_history_list_container">
      {!horizontal && (
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="browsing history"
          pageSizeOptionsMap={productListPageSizeOptionsMap}
          sortOptionsMap={browsingHistorySortOptionsMap}
        />
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : browsingHistory.length === 0 ? (
        <h2>Your Browsing History Is Empty</h2>
      ) : (
        <Timeline horizontal={horizontal}>
          {browsingHistory?.map((historyRecord) => (
            <Timeline.Item
              key={historyRecord.historyId}
              deleteHistoryItem={deleteHistoryItemHandler}
              historyRecord={historyRecord}
            >
              <ProductCard product={historyRecord} horizontal={!horizontal} ribbonText="history" />
            </Timeline.Item>
          ))}
          {horizontal && (
            <div className={`full_history_btn ${horizontal ? 'horizontal' : ''}`}>
              <Button classes="circle" onClick={() => history.push('/history')}>
                View full history
              </Button>
            </div>
          )}
        </Timeline>
      )}
      {historyRecordsCount > historyRecordsPagesize && !horizontal && (
        <div className="full_history_btn">
          <Button classes="rounded" onClick={() => history.push('/history')}>
            View full history
          </Button>
        </div>
      )}
    </section>
  );
};

export default History;
