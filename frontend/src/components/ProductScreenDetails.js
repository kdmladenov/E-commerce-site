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
import { Link } from 'react-router-dom';
import PriceDiscount from './PriceDiscount';

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
  const { productId, title, color, price, description, brand, rating, reviewCount, discount } =
    product;
  return (
    !showZoomedImage && (
      <>
        <div className="product_details_title">{title}</div>
        <div className="product_details_brand">
          <Link to={`/store/${brand}`}>
            <Button classes="text">
              <strong>{`Visit ${brand} store`}</strong>
            </Button>
          </Link>
          <Button classes="text" onClick={() => scrollTo(comparisonRef)}>
            {`Compare ${brand} laptops`}
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
        <Divider>Price</Divider>
        <div className="product_details_price">
          <PriceDiscount price={price} discount={discount} />
        </div>
        <Divider>Color</Divider>
        <div className="product_color">{color}</div>
        <Divider>Main specifications</Divider>
        <div className="product_specifications_main">
          <ProductSpecificationsMain product={product} specsRef={specsRef} />
        </div>
        <Divider>Main features</Divider>
        <div className="product_features_main">
          <ProductFeaturesMain featuresRef={featuresRef} productId={productId} />
        </div>
        <Divider>Description</Divider>
        <div className="product_description">
          <p>{description}</p>
        </div>
      </>
    )
  );
};

export default ProductScreenDetails;
