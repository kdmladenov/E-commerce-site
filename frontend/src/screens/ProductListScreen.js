import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import ProductsSidebar from '../components/ProductsSidebar';
import { PAGING } from '../constants/constants';
import './styles/ProductListScreen.css';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // const [pageSize, setPageSize] = useState(PAGING.DEFAULT_PRODUCT_PAGESIZE);

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  useEffect(() => {
    dispatch(listProducts(history.location.search));
  }, [dispatch, history.location.search]);

  const productsToShow = (
    <ul>
      {products?.map((product) => (
        <li className="product_list_item card" key={product.productId}>
          <ProductCard
            id={product.productId}
            title={product.title}
            image={product.image}
            price={product.price}
            rating={product.rating}
            stockCount={product.stockCount}
            reviewCount={product.reviewCount}
            ratingMap={{
              1: product.starOne || 0,
              2: product.starTwo || 0,
              3: product.starThree || 0,
              4: product.starFour || 0,
              5: product.starFive || 0
            }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <main className="product_list_container">
      <div className="sidebar">{/* <ProductsSidebar /> */}</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="product_list">
          <div className="header">
            <div className="breadcrumbs">Breadcrumbs</div>
            <div className="filters">
            </div>
          </div>
          {productsToShow}
        </div>
      )}
    </main>
  );
};

export default ProductListScreen;
