import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import './styles/ProductCardHomeScreen.css';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';

const ProductCardHomeScreen = ({ id, title, image, price, rating, stockCount }) => {
  const history = useHistory();

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=1`);
  };

  return (
    <div className="product card">
      <div className="product_info">
        <div className="product_title">
          <Link to={`/products/${id}`}>{title}</Link>
        </div>
        <div className="product_price">
          <strong>$ {price}</strong>
        </div>
        <div className="product_rating">
          <Rating rating={rating} />
        </div>
      </div>
      <Link to={`/products/${id}`}>
        <img src={image} alt="product" className="product_image" />
      </Link>
      <div className="product_button">
        <Button onClick={addToCartHandler} types={' rounded medium'} disabled={stockCount === 0}>
          {stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

ProductCardHomeScreen.defaultProps = {
  id: 0,
  title: '',
  image: '',
  price: 0,
  rating: 0
};

ProductCardHomeScreen.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number
};

export default ProductCardHomeScreen;
