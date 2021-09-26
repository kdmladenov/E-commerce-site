import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardHomeScreen from '../components/ProductCardHomeScreen';
import './styles/HomeScreen.css';
import Carousel from '../components/Carousel/Carousel';
import { carouselImages, images } from '../constants/for-developing/sliderImages';
import Slider from '../components/Slider/Slider';

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
    <main className="home">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="home_container">
          <div className="home_slider" onClick={()=> console.log('slider')}>
            <Slider
              images={images}
              dots={false}
              prevBtnClass={'home_slider_prev_btn'}
              nextBtnClass={'home_slider_next_btn'}
            />
          </div>
          <div className="category_card_1">{productsToShow[0]}</div>
          <div className="category_card_2">{productsToShow[5]}</div>
          <div className="category_card_3">{productsToShow[1]}</div>
          <div className="category_card_4">{productsToShow[2]}</div>
          <div className="category_card_5">{productsToShow[3]}</div>
          <div className="category_card_6">{productsToShow[5]}</div>
          <div className="category_card_7">{productsToShow[1]}</div>
          <div className="category_card_8">{productsToShow[2]}</div>
          <div className="category_card_9">{productsToShow[3]}</div>

          <div className="carousel_1">
            <Carousel slides={carouselImages} height={'250px'} />
          </div>
          <div className="carousel_2">
            <Carousel slides={carouselImages} height={'250px'} />
          </div>
        </div>
      )}
    </main>
  );
};

export default HomeScreen;
