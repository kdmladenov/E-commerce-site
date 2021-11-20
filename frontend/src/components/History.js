import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrowsingHistory, listBrowsingHistory } from '../actions/browsingHistoryActions';
import Loader from './Loader';
import Message from './Message';
import ProductCard from './ProductCard';
import './styles/History.css';
import Timeline from './Timeline';

const History = ({horizontal}) => {
  const dispatch = useDispatch();

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading: loadingHistory, browsingHistory, error: errorHistory } = browsingHistoryList;

  const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
  const { success: successDeleteHistory } = browsingHistoryDelete;

  const deleteHistoryItemHandler = (id) => {
    dispatch(deleteBrowsingHistory(id));
  };

  useEffect(() => {
    dispatch(listBrowsingHistory());
  }, [dispatch, successDeleteHistory]);

  return loadingHistory ? (
    <Loader />
  ) : errorHistory ? (
    <Message type="error">{errorHistory}</Message>
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
            id={historyRecord.productId}
            title={historyRecord.title}
            image={historyRecord.image}
            price={historyRecord.price}
            rating={historyRecord.rating}
            stockCount={historyRecord.stockCount}
            reviewCount={historyRecord.reviewCount}
            horizontal={!horizontal}
            ribbonText='history'
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default History;
