import React from 'react';
import './style/ProductTile.css';

const ProductTile = ({ title, items }) => {
  const contentToShow = items?.map((item) => (
    <li className="sub_tile" key={item.subTitle}>
      <img src={item.image} alt={item.subTitle} />
      <span>{item.subTitle}</span>
    </li>
  ));


  return (
    <div className="product_tile card">
      <div className="title">{title}</div>
      <div className="content">{contentToShow}</div>
    </div>
  );
};

export default ProductTile
