import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import './styles/ProductCard.css';

const ProductCard = ({ id, title, image, price, rating }) => {
  const addToBasket = (id) => {};

  return (
    <div className="product">
      <div className="product_info">
        <div className="product_title">{title}</div>
        <div className="product_price">
          <strong>$ {price}</strong>
        </div>
        <div className="product_rating">
          <Rating rating={rating} />
        </div>
      </div>

      <img src={image} alt="product" />

      <button onClick={addToBasket} className="product_button">
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.defaultProps = {
  id: 0,
  title: '',
  image: '',
  price: 0,
  rating: 0
};

ProductCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number
};

export default ProductCard;
