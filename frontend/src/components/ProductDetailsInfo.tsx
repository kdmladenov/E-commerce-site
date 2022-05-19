import React from 'react';
import { Link } from 'react-router-dom';

import './styles/ProductDetailsInfo.css';
import scrollTo from '../helpers/scrollTo';

import Button from './Button';
import Divider from './Divider';
import Popover from './Popover';
import ProductFeaturesMain from './ProductFeaturesMain';
import ProductSpecificationsMain from './ProductSpecificationsMain';
import Rating from './Rating';
import RatingWidget from './RatingWidget';
import PriceDiscount from './PriceDiscount';
import ProductDetailsInfoProps from '../models/components/ProductDetailsInfoProps';

const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({
  productListAdmin,
  showZoomedImage,
  product,
  questionsCount,
  comparisonRef,
  reviewsRef,
  questionsAndAnswersRef,
  specsRef,
  featuresRef
}) => {
  const { title, color, price, description, brand, rating, reviewCount, discount } = product;
  return !showZoomedImage ? (
    <>
      <div className="product_details_title">{title}</div>
      <div className="product_details_brand">
        <Link to={`/store/${brand}`}>
          <Button classes="text">
            <strong>{`Visit ${brand} store`}</strong>
          </Button>
        </Link>
        <Button classes="text" onClick={() => comparisonRef && scrollTo(comparisonRef)}>
          {`Compare ${brand} laptops`}
        </Button>
      </div>
      {!!reviewCount ? (
        <div className="product_details_rating" onClick={() => scrollTo(reviewsRef)}>
          <Popover header={<Rating rating={rating} color="orange"></Rating>}>
            {product && <RatingWidget product={product} />}
          </Popover>

          <Button classes="text" onClick={() => reviewsRef && scrollTo(reviewsRef)}>
            {`from ${reviewCount} customer reviews `}
          </Button>
        </div>
      ) : (
        <span>No reviews yet</span>
      )}
      {!!questionsCount && (
        <span className="product_details_questions">
          <Button
            classes="text"
            onClick={() => questionsAndAnswersRef && scrollTo(questionsAndAnswersRef)}
          >
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

      <div className="product_specifications_main">
        <Divider>Main specifications</Divider>
        <ProductSpecificationsMain product={product} specsRef={specsRef || null} />
      </div>

      {!productListAdmin && (
        <>
          <Divider>Main features</Divider>
          <div className="product_features_main">
            <ProductFeaturesMain featuresRef={featuresRef || null} />
          </div>
        </>
      )}
      <Divider>Description</Divider>
      <div className="product_description">
        <p>{description ? description : 'There are no product description yet'}</p>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ProductDetailsInfo;
