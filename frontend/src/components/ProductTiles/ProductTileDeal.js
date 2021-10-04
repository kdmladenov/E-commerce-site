import React from 'react';
import { numberDecimalFix } from '../../constants/utility-functions.js/utility-functions';
import './style/ProductTileDeal.css';

const ProductTileDeal = ({ product }) => {
  const contentToShow = (
    <>
      <img src={product?.image} alt={product?.title} />
      <span>Today only: Up to 80% off</span>
      <span>$ {numberDecimalFix(product?.price)}</span>
    </>
  );

  return (
    <div className="tile_deal card">
      <h2 className="title">Deal of the Day</h2>
      <div className="content">{contentToShow}</div>
      <h4>See all deals</h4>
    </div>
  );
};

export default ProductTileDeal;
