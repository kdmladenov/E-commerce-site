import React from 'react';
import { useSelector } from 'react-redux';

import './styles/ProductFeaturesMain.css';
import { PRODUCT_FEATURES_MAIN_COUNT } from '../constants/constants';
import scrollTo from '../helpers/scrollTo';

import Button from './Button';
import Loader from './Loader';
import Message from './Message';

const ProductFeaturesMain = ({ featuresRef }) => {
  const { productFeatures, loading, error } = useSelector((state) => state.productFeaturesList);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    productFeatures?.length && (
      <>
        <ul>
          {productFeatures?.slice(0, PRODUCT_FEATURES_MAIN_COUNT).map((feature) => (
            <li key={feature.featureId}>{feature.featureTitle}</li>
          ))}
        </ul>
        <Button classes="text" onClick={() => scrollTo(featuresRef)}>
          See all features
        </Button>
      </>
    )
  );
};

export default ProductFeaturesMain;
