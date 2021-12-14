import React from 'react';
import { scrollTo } from '../constants/utility-functions';
import Button from './Button';
import Divider from './Divider';
import Popover from './Popover';
import ProductFeaturesMain from './ProductFeaturesMain';
import ProductSpecificationsMain from './ProductSpecificationsMain';
import Rating from './Rating';
import RatingWidget from './RatingWidget';
import './styles/ProductScreenDetails.css';

const ProductScreenDetails = ({
  showZoomedImage,
  product,
  questionsCount,
  comparisonRef,
  reviewsRef,
  questionsAndAnswersRef,
  specsRef,
  featuresRef
}) => {
  const { productId, title, description, brand, rating, reviewCount } = product;
  return (
    !showZoomedImage && (
      <>
        <div className="product_details_title">{title}</div>
        <div className="product_details_brand">
          <span>by</span>
          <Button classes="text">
            <strong onClick={() => scrollTo(comparisonRef)}>{brand}</strong>
          </Button>
        </div>
        <div className="product_details_rating" onClick={() => scrollTo(reviewsRef)}>
          <Popover header={<Rating rating={rating} color="orange"></Rating>}>
            {product && <RatingWidget product={product} />}
          </Popover>
          {reviewCount > 0 ? (
            <Button classes="text" onClick={() => scrollTo(reviewsRef)}>
              {`from ${reviewCount} customer reviews `}
            </Button>
          ) : (
            <span>no reviews yet</span>
          )}
        </div>
        {questionsCount && (
          <span className="product_details_questions">
            <Button classes="text" onClick={() => scrollTo(questionsAndAnswersRef)}>
              {` ${questionsCount} answered questions`}
            </Button>
          </span>
        )}
        <Divider />
        <div className="product_specifications_main">
          <h3>Main specs:</h3>
          <ProductSpecificationsMain product={product} specsRef={specsRef} />
        </div>
        <Divider />
        <div className="product_features_main">
          <h3>Main features:</h3>
          <ProductFeaturesMain featuresRef={featuresRef} productId={productId} />
        </div>
        <Divider />
        <div className="product_description">
          <h3>Description:</h3> <p>{description}</p>
        </div>
      </>
    )
  );
};

export default ProductScreenDetails;
