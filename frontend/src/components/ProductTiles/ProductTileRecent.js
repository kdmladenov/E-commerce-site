import React from 'react';
import './style/ProductTileRecent.css';

const ProductTileRecent = ({ product }) => {
  const contentToShow = <img src={product?.image} alt={product?.title} />;

  return (
    <div className="tile_recent card">
      <h2 className="title">Recently viewed</h2>
      <div className="content">{contentToShow}</div>
      <h4>View your browsing history</h4>
    </div>
  );
};

export default ProductTileRecent;
