import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import './styles/HomeScreen.css';
import { images } from '../constants/for-developing/sliderImages';
import Carousel from '../components/Carousel';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import History from '../components/History';
import ProductTile from '../components/ProductTile';
import Rating from '../components/Rating';
import Price from '../components/Price';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productlist = useSelector((state) => state.productList);
  const { products } = productlist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { browsingHistory } = browsingHistoryList;

  const wishListItems = useSelector((state) => state.wishListItems);
  const { wishList } = wishListItems;
  console.log(wishList?.length);
  console.log('refresh');

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listProducts(`pageSize=${localStorage.getItem('totalProductCount') || 30}`));
  }, [dispatch]);

  return (
    <main className="home">
      {/* <div className="home"> */}
      <div className="home_slider">
        <Slider images={images} dots={false} />
      </div>

      <div className="product_tiles_row_1">
        <div className="tile_1">
          <ProductTile
            products={['Apple', 'HP', 'Lenovo', 'Dell'].map((brand) =>
              products.find((product) => product.brand === brand)
            )}
            itemSubtitleLine1="brand"
            header="Shop by brand"
          />
        </div>
        <div className="tile_2">
          {cartItems?.length > 0 ? (
            <ProductTile
              products={cartItems.slice(0, cartItems?.length >= 4 ? 4 : 1)}
              itemSubtitleLine1="title"
              itemSubtitleLine2="price"
              header="Your cart"
              footer="Go to cart"
              footerLink="/cart"
            />
          ) : (
            <ProductTile
              products={products.filter((product) => product.screenSize >= 14).slice(0, 4)}
              itemSubtitleLine1="title"
              header="Screen 14' and down"
            />
          )}
          {/* <Carousel title="Best value">
            <ul>
              {products
                .sort((a, b) => a.price - b.price)
                .map((product) => (
                  <li key={product.productId}>
                    <Link to={`/products/${product.productId}`}>
                      <img src={product.image} alt={product.title} />
                      <div className="content">
                        <div className="title">{product.title}</div>
                        <Price price={product?.price} size="small" />
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </Carousel> */}
        </div>
        <div className="tile_3">
          {userInfo?.token && products && browsingHistory?.length > 0 ? (
            <ProductTile
              products={browsingHistory?.slice(0, browsingHistory?.length >= 4 ? 4 : 1)}
              itemSubtitleLine1="title"
              itemSubtitleLine2="price"
              header="Last visited"
              footer="View browsing history"
              footerLink="/history"
            />
          ) : (
            <ProductTile
              products={products.filter((product) => product.price >= 900).slice(0, 4)}
              itemSubtitleLine1="title"
              header="Price $900 and up"
            />
          )}
        </div>
        <div className="tile_4">
          {userInfo?.token && products && wishList?.length > 0 ? (
            <ProductTile
              products={wishList?.slice(0, wishList?.length >= 4 ? 4 : 1)}
              itemSubtitleLine1="title"
              itemSubtitleLine2="price"
              header="Your wish list"
              footer="View wish list"
              footerLink="/wishlist"
            />
          ) : (
            <ProductTile
              products={products
                .filter((product) => product.operatingSystem === 'Chrome OS')
                .slice(0, 4)}
              itemSubtitleLine1="title"
              header="Chrome OS laptops"
            />
          )}
        </div>
        <div className="tile_5">
          {/* <ProductTile
                products={products.sort((a, b) => a.price - b.price).slice(0, 4)}
                itemSubtitleLine2="price"
                header="Most affordable"
                footer="View all products"
                footerLink="/productlist"
              /> */}
          <ProductTile
            products={products.sort((a, b) => b.discount - a.discount).slice(0, 1)}
            itemSubtitleLine1="Today only: up to 30% off"
            itemSubtitleLine2="price"
            header="Deal of the day"
          />
        </div>
      </div>
      <div className="product_tiles_row_2">
        <div className="tile_6">
          <ProductTile
            products={products.sort((a, b) => b.rating - a.rating).slice(0, 4)}
            header="Highest rating"
            footer="View all products"
            footerLink="/productlist"
          />
        </div>
        <div className="tile_7">
          <ProductTile
            products={products.sort((a, b) => b.productId - a.productId).slice(0, 4)}
            itemSubtitleLine1="title"
            header="Newest products"
            footer="View all products"
            footerLink="/productlist"
          />
        </div>
        <div className="tile_8">
          <ProductTile
            products={products.filter((product) => product.processorBrand === 'AMD').slice(0, 4)}
            itemSubtitleLine1="title"
            header="AMD laptops"
          />
        </div>
        <div className="tile_9">
          <ProductTile
            products={products.filter((product) => product.processorBrand === 'Intel').slice(0, 4)}
            itemSubtitleLine1="title"
            header="Intel laptops"
            footer="View all Intel laptops"
            footerLink="/search/Intel"
          />
        </div>
        <div className="tile_10">
          <ProductTile
            products={products.filter((product) => product.graphicsType === 'Dedicated')}
            itemSubtitleLine1="title"
            itemSubtitleLine2="price"
            header="Dedicated graphics"
          />
        </div>
      </div>
      <div className="product_tiles_row_3">
        <div className="tile_11">
          <ProductTile
            products={products
              .filter((product) => product.operatingSystem === 'Chrome OS')
              .slice(0, 4)}
            itemSubtitleLine1="title"
            header="Chromebooks"
          />
        </div>
        <div className="carousel_os">
          <Carousel title={'Windows Laptops'}>
            <ul>
              {products
                .filter((product) => product.operatingSystem.includes('Windows'))
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

      <div className="carousel_1">
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

      <div className="carousel_2">
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
        <div className="carousel_3">
          <Carousel title={'Your Browsing History'}>
            <History horizontal={true} />
          </Carousel>
        </div>
      )}
      {/* </div> */}
    </main>
  );
};

export default HomeScreen;
