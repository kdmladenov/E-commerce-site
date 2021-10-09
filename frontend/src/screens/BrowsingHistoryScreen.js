import React, { useEffect } from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrowsingHistory, listBrowsingHistory } from '../actions/browsingHistoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardVertical from '../components/ProductCard/ProductCardVertical';
import './styles/BrowsingHistory.css';

const BrowsingHistory = () => {
  const dispatch = useDispatch();

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading, browsingHistory, error } = browsingHistoryList;

  const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
  const { success: successDelete } = browsingHistoryDelete;

  useEffect(() => {
    dispatch(listBrowsingHistory());
  }, [dispatch, successDelete]);

  const productsToShow = browsingHistory?.map((historyRecord) => (
    <li className="product" key={historyRecord.historyId}>
      <ProductCardVertical
        title={historyRecord.title}
        image={historyRecord.image}
        price={historyRecord.price}
        rating={historyRecord.rating}
        stockCount={historyRecord.stockCount}
      />
      <Button onClick={() => dispatch(deleteBrowsingHistory(historyRecord.historyId))}>
        Delete
      </Button>
    </li>
  ));

  return (
    <main className="browsing_history_list container">
      <div className="sidebar">sidebar</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="browsing_history_list_container">
          <h1>Your Browsing History</h1>
          <ul>{productsToShow}</ul>
        </div>
      )}
    </main>
  );
};

export default BrowsingHistory;
