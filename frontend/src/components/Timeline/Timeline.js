import React, { useEffect } from 'react';
import  Button  from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrowsingHistory, listBrowsingHistory } from '../../actions/browsingHistoryActions';
import Loader from '../Loader';
import Message from '../Message';
import ProductCardVertical from '../ProductCard/ProductCardVertical';
import './styles/Timeline.css';
import TimelineItem from './TimelineItem';

const Timeline = () => {
const dispatch = useDispatch();

const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
const { loading, browsingHistory, error } = browsingHistoryList;

const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
const { success: successDelete } = browsingHistoryDelete;

useEffect(() => {
  dispatch(listBrowsingHistory());
}, [dispatch, successDelete]);

const productsToShow = browsingHistory?.map((historyRecord) => (
  <TimelineItem key={historyRecord.historyId}>
    <ProductCardVertical
      title={historyRecord.title}
      image={historyRecord.image}
      price={historyRecord.price}
      rating={historyRecord.rating}
      stockCount={historyRecord.stockCount}
    />
    <Button onClick={() => dispatch(deleteBrowsingHistory(historyRecord.historyId))}>Delete</Button>
  </TimelineItem>
));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <div className="timeline-container">
      <h1>Your Browsing History</h1>
      {productsToShow}
    </div>
  );
};

export default Timeline;
