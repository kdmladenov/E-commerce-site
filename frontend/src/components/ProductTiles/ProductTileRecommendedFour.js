import React from 'react';
import './style/ProductTileRecommendedFour.css';

const ProductTileRecommendedFour = ({ title, subtitle, content }) => {
  const contentToShow = content?.map((item) => (
    <li key={item.subTitle}>
      <img src={item.image} alt={item.subTitle} />
      <p>{item.subTitle}</p>
    </li>
  ));

  return (
    <div className="tile_recommended_four card">
      <h2 className="title">{title}</h2>
      <ul className="content">{contentToShow}</ul>
      <p>{subtitle}</p>
    </div>
  );
};

export default ProductTileRecommendedFour;