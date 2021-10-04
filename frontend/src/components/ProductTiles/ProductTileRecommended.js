import React from 'react';
import './style/ProductTileRecommended.css';

const ProductTileRecommended = ({ content }) => {
  const contentToShow = (
    <div className="content">
      <img src={content.image} alt={content.subTitle} />
    </div>
  );
      


  return (
    <div className="tile_recommended card">
      <h2 className="title">{content.subTitle}</h2>
      {contentToShow}
      <h4>See all in {content.subTitle}</h4>
    </div>
  );
};

export default ProductTileRecommended;