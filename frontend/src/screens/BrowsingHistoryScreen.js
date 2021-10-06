import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBrowsingHistory } from '../actions/browsingHistoryActions';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardVertical from '../components/ProductCard/ProductCardVertical';
import './styles/BrowsingHistory.css';

const BrowsingHistory = () => {
  const dispatch = useDispatch();

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading, browsingHistory, error } = browsingHistoryList;

  useEffect(() => {
    dispatch(listBrowsingHistory());
  }, [dispatch]);

  console.log(browsingHistory, 'browsingHistory');

  const productsToShow = browsingHistory?.map((product) => (
    <li className="product" key={product.productId}>
      <ProductCardVertical
        title={product.title}
        image={product.image}
        price={product.price}
        rating={product.rating}
        stockCount={product.stockCount}
      />
    </li>
  ));

  return (
    <main className="product_history_list container">
      <div className="sidebar">sidebar</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_history_list_container">
          <ul>{productsToShow}</ul>
        </div>
      )}
    </main>
  );
};

export default BrowsingHistory;
