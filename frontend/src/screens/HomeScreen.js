import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardVertical from '../components/ProductCard/ProductCardVertical';
import './styles/HomeScreen.css';
import Carousel from '../components/Carousel/Carousel';
import { carouselImages, categoriesTiles, images } from '../constants/for-developing/sliderImages';
import Slider from '../components/Slider/Slider';
import ProductTileRecommendedFour from '../components/ProductTiles/ProductTileRecommendedFour';
import ProductTileRecent from '../components/ProductTiles/ProductTileRecent';
import ProductTileDeal from '../components/ProductTiles/ProductTileDeal';
import ProductTileRecentFour from '../components/ProductTiles/ProductTileRecentFour';
import ProductTileRecommended from '../components/ProductTiles/ProductTileRecommended';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const productsToShow = products?.map((product) => (
  //   <ProductCardVertical
  //     key={product.productId}
  //     id={product.productId}
  //     title={product.title}
  //     image={product.image}
  //     price={product.price}
  //     rating={product.rating}
  //     stockCount={product.stockCount}
  //   />
  // ));

  return (
    <main className="home">
      <div className="home_slider" onClick={() => console.log('slider')}>
        <Slider
          images={images}
          dots={false}
          prevBtnClass={'home_slider_prev_btn'}
          nextBtnClass={'home_slider_next_btn'}
        />
      </div>
      <div className="product_tile_group_1">
        <div className="tile_1">
          <ProductTileRecommendedFour
            title={categoriesTiles['recommended'].title}
            content={categoriesTiles['recommended'].content}
          />
        </div>
        <div className="tile_2">{<ProductTileRecent product={products[2]} />}</div>
        <div className="tile_3">{<ProductTileDeal product={products[5]} />}</div>
        <div className="tile_4">{<ProductTileRecentFour products={products.slice(0, 4)} />}</div>
        <div className="tile_5">
          {<ProductTileRecommended content={categoriesTiles['recommended'].content[0]} />}
        </div>
        <div className="tile_6">
          <ProductTileRecommendedFour
            title={categoriesTiles['Kitchen & Dining'].title}
            content={categoriesTiles['Kitchen & Dining'].content}
          />
        </div>
        <div className="tile_7">
          <ProductTileRecommendedFour
            title={categoriesTiles['Fashion'].title}
            content={categoriesTiles['Fashion'].content}
          />
        </div>
        <div className="tile_8">
          <ProductTileRecommendedFour
            title={categoriesTiles['Outdoors'].title}
            content={categoriesTiles['Outdoors'].content}
          />
        </div>
        <div className="tile_9">
          <ProductTileRecommendedFour
            title={categoriesTiles['Toys & Games'].title}
            content={categoriesTiles['Toys & Games'].content}
          />
        </div>
        <div className="tile_10">
          <ProductTileRecommendedFour
            title={categoriesTiles['Electronics'].title}
            content={categoriesTiles['Electronics'].content}
          />
        </div>
      </div>

      <div className="carousel_1">
        <Carousel slides={carouselImages} height={'250px'} />
      </div>
      <div className="carousel_2">
        <Carousel slides={carouselImages} height={'250px'} />
      </div>
      {/* <div className="product_tile_group_2">
        <div className="tile_11">
          {tilesToShow('Recommended for you', [recommendedProducts[0]])}
        </div>
        <div className="tile_12">
          {tilesToShow('Recommended for you', [recommendedProducts[0]])}
        </div>
        <div className="tile_13">
          {tilesToShow('Recommended for you', [recommendedProducts[0]])}
        </div>
        <div className="tile_14">
          {tilesToShow('Recommended for you', [recommendedProducts[0]])}
        </div>
        <div className="tile_15">
          {tilesToShow('Recommended for you', [recommendedProducts[0]])}
        </div>
      </div> */}
    </main>
  );
};

export default HomeScreen;
