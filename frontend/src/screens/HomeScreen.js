import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import './styles/HomeScreen.css';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import History from '../components/History';
import ProductTile from '../components/ProductTile';
import Rating from '../components/Rating';
import Price from '../components/Price';
import { SLIDER_IMAGE_1 } from '../constants/constants';
import { listWishedItems } from '../actions/wishListActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { browsingHistory } = useSelector((state) => state.browsingHistoryList);

  const { wishList } = useSelector((state) => state.wishListItems);
  
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(listProducts(`pageSize=${localStorage.getItem('totalProductCount') || 30}`));
    dispatch(listWishedItems());
  }, [dispatch]);

  return (
    <main className="home_screen">
      <div className="home">
        <div className="home_slider">
          <Slider dots={false}>
            <Slider.Item
              classes="title_right white_text"
              color="var(--carrot-juice)"
              title="Top Deals"
              products={products.sort((a, b) => b.discount - a.discount).slice(0, 4)}
              itemSubtitleLine="discount"
            />
            <Slider.Item
              classes="title_left black_text"
              color="var(--playdoh)"
              title="Shop by Brand"
              products={['Apple', 'MSI', 'Microsoft'].map((brand) =>
                products.find((product) => product.brand === brand)
              )}
              itemSubtitleLine="brand"
            />
            <Slider.Item image={SLIDER_IMAGE_1} />
          </Slider>
        </div>

        <div className="product_tiles_row_1">
          <div className="tile_1">
            <ProductTile
              header="Best sellers"
              products={products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 4)}
              itemSubtitleLine1="title"
              itemSubtitleLine2="price"
            />
          </div>
          <div className="tile_2">
            {cartItems?.length > 0 ? (
              <ProductTile
                header="Your cart"
                products={cartItems.slice(0, cartItems?.length >= 4 ? 4 : 1)}
                itemSubtitleLine1="title"
                itemSubtitleLine2="price"
                footer="Go to cart"
                footerLink="/cart"
              />
            ) : (
              <ProductTile
                header="Screen 14' and down"
                products={products.filter((product) => product.screenSize >= 14).slice(0, 4)}
                itemSubtitleLine1="title"
              />
            )}
          </div>
          <div className="tile_3">
            {userInfo?.token && products && browsingHistory?.length > 0 ? (
              <ProductTile
                header="Last visited"
                products={browsingHistory?.slice(0, browsingHistory?.length >= 4 ? 4 : 1)}
                itemSubtitleLine1="title"
                itemSubtitleLine2="price"
                footer="View browsing history"
                footerLink="/history"
              />
            ) : (
              <ProductTile
                header="Price $900 and up"
                products={products.filter((product) => product.price >= 900).slice(0, 4)}
                itemSubtitleLine1="title"
              />
            )}
          </div>
          <div className="tile_4">
            {userInfo?.token && products && wishList?.length > 0 ? (
              <ProductTile
                header="Your wish list"
                products={wishList?.slice(0, wishList?.length >= 4 ? 4 : 1)}
                itemSubtitleLine1="title"
                itemSubtitleLine2="price"
                footer="View wish list"
                footerLink="/wishlist"
              />
            ) : (
              <ProductTile
                header="Chrome OS laptops"
                products={products
                  .filter((product) => product.operatingSystem === 'Chrome OS')
                  .slice(0, 4)}
                itemSubtitleLine1="title"
              />
            )}
          </div>
          <div className="tile_5">
            <ProductTile
              header="Deal of the day"
              products={products.sort((a, b) => b.discount - a.discount).slice(0, 1)}
              itemSubtitleLine1="Today only: up to 30% off"
              itemSubtitleLine2="price"
            />
          </div>
        </div>
        <div className="product_tiles_row_2">
          <div className="tile_6">
            <ProductTile
              header="Highest rating"
              products={products.sort((a, b) => b.rating - a.rating).slice(0, 4)}
              footer="View all products"
              itemSubtitleLine1="title"
              itemSubtitleLine2="rating"
              footerLink="/productlist"
            />
          </div>
          <div className="tile_7">
            <ProductTile
              header="Newest products"
              products={products.sort((a, b) => b.productId - a.productId).slice(0, 4)}
              itemSubtitleLine1="title"
              footer="View all products"
              footerLink="/productlist"
            />
          </div>
          <div className="tile_8">
            <ProductTile
              header="Most reviewed"
              products={products.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4)}
              itemSubtitleLine1="title"
            />
          </div>
          <div className="tile_9">
            <ProductTile
              header="Most wished"
              products={products.sort((a, b) => b.wishedCount - a.wishedCount).slice(0, 4)}
              itemSubtitleLine1="title"
              itemSubtitleLine2="price"
            />
          </div>
          <div className="tile_10">
            <ProductTile
              header="Most popular"
              products={products.sort((a, b) => b.visitedCount - a.visitedCount).slice(0, 4)}
              itemSubtitleLine1="title"
              itemSubtitleLine2="price"
            />
          </div>
        </div>
        <div className="product_tiles_row_3">
          <div className="tile_11">
            <ProductTile
              header="Shop by brand"
              products={['Apple', 'HP', 'Lenovo', 'Dell'].map((brand) =>
                products.find((product) => product.brand === brand)
              )}
              itemSubtitleLine1="brand"
            />
          </div>
          <div className="carousel_4 card">
            <Carousel title={'Best value laptops'}>
              <ul>
                {products
                  .sort((a, b) => a.price - b.price)
                  .map((product) => (
                    <li key={product.productId}>
                      <Link to={`/products/${product.productId}`}>
                        <img src={product.image} alt={product.title} />
                        <div className="content">
                          <div className="title">{product.title}</div>
                          <div className="rating">
                            <Rating rating={product.rating} />
                            <span>({product.reviewCount})</span>
                          </div>
                          <Price price={product?.price} size="small" />
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Carousel>
          </div>
          <div className="tile_12">
            <ProductTile
              products={[products.find((product) => product.brand === 'Apple')]}
              itemSubtitleLine1="title"
              header="Mac OS laptops"
              footer="View all Mac OS laptops"
              footerLink="/store/Apple"
            />
          </div>
        </div>

        <div className="carousel_1 card">
          <Carousel title={'Newest Products'}>
            <ul>
              {products
                .sort((a, b) => b.productId - a.productId)
                .map((product) => (
                  <li key={product.productId}>
                    <Link to={`/products/${product.productId}`}>
                      <img src={product.image} alt={product.title} />
                    </Link>
                  </li>
                ))}
            </ul>
          </Carousel>
        </div>

        <div className="carousel_2 card">
          <Carousel title={'All Laptops'}>
            <ul>
              {products
                .sort((a, b) => a.price - b.price)
                .map((product) => (
                  <li key={product.productId}>
                    <Link to={`/products/${product.productId}`}>
                      <img src={product.image} alt={product.title} />
                      <div className="content">
                        <div className="title">{product.title}</div>
                        <div className="rating">
                          <Rating rating={product.rating} />
                          <span>({product.reviewCount})</span>
                        </div>
                        <Price price={product?.price} size="small" />
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </Carousel>
        </div>

        {userInfo?.token && (
          <div className="carousel_3 card">
            <Carousel title={'Your Browsing History'}>
              <History horizontal={true} />
            </Carousel>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomeScreen;
