import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import './styles/ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, image, price, rating }) => {
  const addToBasket = (id) => {};

  return (
    <div className="product">
      <div className="product_info">
        <div className="product_title"><Link to={`/products/${id}`}>{title}</Link></div>
        <div className="product_price">
          <strong>$ {price}</strong>
        </div>
        <div className="product_rating">
          <Rating rating={rating} />
        </div>
      </div>

      <Link to={`/products/${id}`}><img src={image} alt="product" className='product_image'/></Link>

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
