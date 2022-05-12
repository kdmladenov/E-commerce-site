import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProductFeatures.css';
import { listProductFeatures } from '../state/actions/productFeaturesActions';
import useTypedSelector from '../hooks/useTypedSelector';

import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';

const ProductFeatures: React.FC<{ productId: number }> = ({ productId }) => {
  const dispatch = useDispatch();

  const { productFeatures, loading, error } = useTypedSelector(
    (state) => state.productFeaturesList
  );

  useEffect(() => {
    dispatch(listProductFeatures(productId));
  }, [dispatch, productId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : productFeatures?.length > 0 ? (
    <Accordion>
      {productFeatures?.map((feature) => (
        <Accordion.Item key={feature.featureId}>
          <Accordion.Header>
            <Accordion.Title>{feature.featureTitle}</Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>{feature.featureContent}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    <Message type="success">No features</Message>
  );
};

export default ProductFeatures;
