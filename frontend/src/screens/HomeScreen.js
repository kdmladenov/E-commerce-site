import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import './styles/HomeScreen.css';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  console.log(products);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productsToShow = products?.map((product) => (
    <ProductCard
      id={product.id}
      title={product.title}
      image={product.image}
      price={product.price}
      rating={product.rating}
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
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/183/315/original/summer-sale-online-shopping-banner-vector.jpg"
            alt="banner"
          />

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
