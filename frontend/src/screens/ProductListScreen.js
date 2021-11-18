import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import './styles/ProductListScreen.css';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  useEffect(() => {
    dispatch(listProducts(history.location.search));
  }, [dispatch, history.location.search]);

  const productsToShow = products?.map((product) => (
    <li className="product" key={product.productId}>
      <ProductCard
        id={product.productId}
        title={product.title}
        image={product.image}
        price={product.price}
        rating={product.rating}
        stockCount={product.stockCount}
        reviewCount={product.reviewCount}
      />
    </li>
  ));

  return (
    <main className="product_list container">
      <div className="sidebar">sidebar</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_list_container">
          <ul>{productsToShow}</ul>
        </div>
      )}
    </main>
  );
};

export default ProductListScreen;
