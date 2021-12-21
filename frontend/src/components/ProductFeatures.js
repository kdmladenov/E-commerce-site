import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductFeatures } from '../actions/productFeaturesActions';
import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';
import './styles/ProductFeatures.css';

const ProductFeatures = ({ productId }) => {
  const dispatch = useDispatch();

  const productFeaturesList = useSelector((state) => state.productFeaturesList);
  const { productFeatures, loading, error } = productFeaturesList;

  useEffect(() => {
    dispatch(listProductFeatures(productId));
  }, [dispatch, productId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : productFeatures?.length > 0 ? (
    <Accordion>
      {productFeatures?.map((feature, index) => (
        <Accordion.Item key={feature.featuresId}>
          <Accordion.Header singleopened="true" index={index}>
            <Accordion.Title>{feature.featureTitle}</Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>{feature.featureContent}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    <Message type="success">Ask Question Box</Message>
  );
};

export default ProductFeatures;
