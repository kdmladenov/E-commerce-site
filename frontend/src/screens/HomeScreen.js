import React from 'react';
import ProductCard from '../components/ProductCard';
import './styles/HomeScreen.css';

const HomeScreen = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img
          src="https://static.vecteezy.com/system/resources/previews/001/183/315/original/summer-sale-online-shopping-banner-vector.jpg"
          alt="banner"
        />
        <div className="home_row">
          <ProductCard
            id={15345325}
            title="New Apple Watch Series 6 (GPS, 40mm) - Blue Aluminum Case with Deep Navy Sport Band"
            image={'https://images-na.ssl-images-amazon.com/images/I/41dhCYGgBxL.jpg'}
            price={199.99}
            rating={4.5}
          />
          <ProductCard
            id={1535355}
            title={'Apple AirPods Pro'}
            image={'https://images-na.ssl-images-amazon.com/images/I/31gtbqaQ1nL.jpg'}
            price={159.99}
            rating={4.3}
          />
        </div>
        <div className="home_row">
          {' '}
          <ProductCard
            id={23422355}
            title={'Apple MagSafe Charger'}
            image={'https://m.media-amazon.com/images/I/91ghhfky4LL._AC_UY436_FMwebp_QL65_.jpg'}
            price={49.99}
            rating={2.3}
          />
          <ProductCard
            id={242424}
            title={'Echo Dot (3rd Gen) - Smart speaker with Alexa - Plum'}
            image={'https://m.media-amazon.com/images/I/71yEX4ugtJL._AC_UY436_FMwebp_QL65_.jpg'}
            price={49.99}
            rating={4.2}
          />
          <ProductCard
            id={24222424}
            title={
              'Tile Mate (2020) 1-pack - Bluetooth Tracker, Keys Finder and Item Locator for Keys, Bags and More; Water Resistant with 1 Year Replaceable Battery'
            }
            image={'https://m.media-amazon.com/images/I/41eZryo4YXS._AC_UY436_QL65_.jpg'}
            price={24.68}
            rating={4}
          />
        </div>
        <div className="home_row">
          <ProductCard
            id={256456}
            title={'SAMSUNG LC49RG90SSNXZA 49-Inch CRG9 Curved Gaming Monitor, Black, QHD, 120Hz'}
            image={'https://m.media-amazon.com/images/I/71916r38cNL._AC_UY436_FMwebp_QL65_.jpg'}
            price={599.99}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
