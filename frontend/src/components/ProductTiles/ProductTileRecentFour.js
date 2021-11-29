import React from 'react';
import { Link } from 'react-router-dom';
import { numberDecimalFix } from '../../constants/utility-functions';
import './style/ProductTileRecentFour.css';

const ProductTileRecentFour = ({ products }) => {
  const contentToShow = products?.map((product) => (
    <li key={product.title}>
      <Link to={`/products/${product?.productId}`}>
        <img src={product.image} alt={product.title} />
        <div className="product_title">{product.title}</div>
        <div className="product_price">$ {numberDecimalFix(product.price)}</div>
      </Link>
    </li>
  ));

  return (
    <div className="tile_recent_four card">
      <h2 className="title">Keep shopping for</h2>
      <ul className="content">{contentToShow}</ul>
    </div>
  );
};

export default ProductTileRecentFour;
