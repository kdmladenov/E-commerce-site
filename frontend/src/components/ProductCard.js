import './styles/ProductCard.css';

import React from 'react';

const ProductCard = ({ id, title, image, price, rating }) => {

  const addToBasket = (id) => {

  }

  return (
    <div className="product">
      <p className="product_info">{title}</p>
      <p className="product_price">
        <small>$</small>
        <strong>{price}</strong>
      </p>
      <p className="product_rating">
      
      </p>
      <img src={image} alt="product" />
      <button onClick={addToBasket} className="product_button">
        Add to Basket
      </button>
    </div>
  );
};

export default ProductCard;
