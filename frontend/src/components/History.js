import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteBrowsingHistory,
  listBrowsingHistory
} from '../state/actions/browsingHistoryActions';
import Button from './Button';
import HeaderControls from './HeaderControls';
import Loader from './Loader';
import Message from './Message';
import ProductCard from './ProductCard';
import './styles/History.css';
import Timeline from './Timeline';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { browsingHistorySortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import getRibbonText from '../helpers/getRibbonText';

const History = ({ horizontal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [endpoint, setEndpoint] = useState(defaultEndpoint['history']);

  const { loading, browsingHistory, error } = useSelector((state) => state.browsingHistoryList);

  const { success: successDeleteHistoryRecord } = useSelector(
    (state) => state.browsingHistoryDelete
  );

  const historyRecordsPagesize = +endpoint.pageSize.replace('pageSize=', '').replace('&', '');
  const historyRecordsCount = browsingHistory?.[0]?.totalDBItems;

  const deleteHistoryItemHandler = (id) => {
    dispatch(deleteBrowsingHistory(id));
  };

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listBrowsingHistory(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDeleteHistoryRecord]);

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
      <div className={`history_timeline flex ${horizontal ? 'horizontal' : ''}`}>
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
                <ProductCard
                  product={historyRecord}
                  horizontal={!horizontal}
                  ribbonText={getRibbonText(historyRecord.productId)}
                />
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
      </div>
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
