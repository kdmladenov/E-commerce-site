import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardVertical from '../components/ProductCard/ProductCardVertical';
import './styles/HomeScreen.css';
import { categoriesTiles, images } from '../constants/for-developing/sliderImages';
import ProductTileRecommendedFour from '../components/ProductTiles/ProductTileRecommendedFour';
import ProductTileRecent from '../components/ProductTiles/ProductTileRecent';
import ProductTileDeal from '../components/ProductTiles/ProductTileDeal';
import ProductTileRecentFour from '../components/ProductTiles/ProductTileRecentFour';
import ProductTileRecommended from '../components/ProductTiles/ProductTileRecommended';
import { listBrowsingHistory } from '../actions/browsingHistoryActions';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider/Slider';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading: LoadingHistory, browsingHistory, error: errorHistory } = browsingHistoryList;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listBrowsingHistory());
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

  const slidesRowToRender = (
    <ul>
      {products?.map((item, index) => (
        <li key={index}>
          <Link to={`/products/${item.productId}`}>
            <img src={item.image} alt={item.title} />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <main className="home">
      <div className="home_container">
        <div className="home_slider" onClick={() => console.log('slider')}>
          <Slider
            images={images}
            dots={false}
            prevBtnClass={'home_slider_prev_btn'}
            nextBtnClass={'home_slider_next_btn'}
          />
        </div>
        <div className="product_tile_group_1">
          {userInfo?.token ? (
            <div className="product_tile_group_1_row_1">
              <div className="tile_1">
                <ProductTileRecommendedFour
                  title={categoriesTiles['recommended'].title}
                  content={categoriesTiles['recommended'].content}
                />
              </div>
              <div className="tile_2">{<ProductTileRecent product={browsingHistory[0]} />}</div>
              <div className="tile_3">{<ProductTileDeal product={products[5]} />}</div>
              <div className="tile_4">
                {browsingHistory.length >= 4 ? (
                  <ProductTileRecentFour products={products.slice(0, 4)} />
                ) : (
                  <ProductTileRecent product={browsingHistory[2]} />
                )}
              </div>
              <div className="tile_5">
                {<ProductTileRecommended content={categoriesTiles['recommended'].content[0]} />}
              </div>
            </div>
          ) : (
            <div className="product_tile_group_1_row_1">
              <div className="tile_1">
                <ProductTileRecommendedFour
                  title={categoriesTiles['Kitchen & Dining'].title}
                  content={categoriesTiles['Kitchen & Dining'].content}
                />
              </div>
              <div className="tile_2">
                <ProductTileRecommendedFour
                  title={categoriesTiles['Fashion'].title}
                  content={categoriesTiles['Fashion'].content}
                />
              </div>
              <div className="tile_3">
                <ProductTileRecommendedFour
                  title={categoriesTiles['Outdoors'].title}
                  content={categoriesTiles['Outdoors'].content}
                />
              </div>
              <div className="tile_4">
                <ProductTileRecommendedFour
                  title={categoriesTiles['Toys & Games'].title}
                  content={categoriesTiles['Toys & Games'].content}
                />
              </div>
              <div className="tile_5">
                <ProductTileRecommendedFour
                  title={categoriesTiles['Electronics'].title}
                  content={categoriesTiles['Electronics'].content}
                />
              </div>
            </div>
          )}
          <div className="product_tile_group_1_row_2">
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
        </div>

        <div className="carousel_1">
          <Carousel title={'Some title content'} isPageVisible={true}>
            {slidesRowToRender}
          </Carousel>
        </div>

        <div className="carousel_2">
          <Carousel title={'Some title content'} isPageVisible={true}>
            {slidesRowToRender}
          </Carousel>
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
      </div>
    </main>
  );
};

export default HomeScreen;
