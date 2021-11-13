import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import './styles/ProductCardVertical.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Button';
import { BASE_URL } from '../../constants/constants';

const ProductCardVertical = ({ id, title, image, price, rating, stockCount }) => {
  const history = useHistory();

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=1`);
  };

  return (
    <div className="product_card">
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
        <img
          src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
          alt="product"
          className="product_image"
        />
      </Link>
      <div className="product_button">
        <Button onClick={addToCartHandler} classes={' rounded medium'} disabled={stockCount === 0}>
          {stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

ProductCardVertical.defaultProps = {
  id: 0,
  title: '',
  image: '',
  price: 0,
  rating: 0
};

ProductCardVertical.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number
};

export default ProductCardVertical;
