import React from 'react';
import { Link } from 'react-router-dom';
import './style/ProductTileRecent.css';

const ProductTileRecent = ({ product }) => {
  const contentToShow = <img src={product?.image} alt={product?.title} />;
  console.log(product, 'product');
  return (
    <div className="tile_recent card">
      <h2 className="title">Recently viewed</h2>
      <Link to={`/products/${product?.productId}`}>
        <div className="content">{contentToShow}</div>
      </Link>

      <Link to='/history'>
        <h4>View your browsing history</h4>
      </Link>
    </div>
  );
};

export default ProductTileRecent;
