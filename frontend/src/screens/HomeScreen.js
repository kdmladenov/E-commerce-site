import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardHomeScreen from '../components/ProductCardHomeScreen';
import './styles/HomeScreen.css';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productsToShow = products?.map((product) => (
    <ProductCardHomeScreen
      key={product.productId}
      id={product.productId}
      title={product.title}
      image={product.image}
      price={product.price}
      rating={product.rating}
      stockCount={product.stockCount}
    />
  ));

  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="home_container">
          <img src="https://cdn.nohat.cc/thumb/f/720/0daa94dcf2494fc4a5e6.jpg" alt="banner" />

          <div className="home_row">
            {productsToShow[0]}
            {productsToShow[1]}
          </div>
          <div className="home_row">
            {productsToShow[2]}
            {productsToShow[3]}
            {productsToShow[5]}
          </div>
          <div className="home_row">{productsToShow[4]}</div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
