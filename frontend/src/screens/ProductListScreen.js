import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardHomeScreen from '../components/ProductCardHomeScreen';
import './styles/ProductListScreen.css';
import Carousel from '../components/Carousel/Carousel';
import { carouselImages, images } from '../constants/for-developing/sliderImages';
import Slider from '../components/Slider/Slider';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  useEffect(() => {
    dispatch(listProducts(history.location.search));
  }, [dispatch, history.location.search]);

  const productsToShow = products?.map((product) => (
    <li className="product" key={product.productId}>
      <ProductCardHomeScreen
        title={product.title}
        image={product.image}
        price={product.price}
        rating={product.rating}
        stockCount={product.stockCount}
      />
    </li>
  ));

  return (
    <main className="product_list">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_list_container">
          <div className="sidebar">sidebar</div>
          <ul>{productsToShow}</ul>
        </div>
      )}
    </main>
  );
};

export default ProductListScreen;
