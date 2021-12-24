import React, { useEffect } from 'react';
import './styles/ProductFeaturesEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PRODUCT_FEATURE_UPDATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductFeatures } from '../actions/productFeaturesActions';
import Accordion from './Accordion';

const ProductFeaturesEdit = ({ productId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productFeaturesList = useSelector((state) => state.productFeaturesList);
  const { productFeatures, loading, error } = productFeaturesList;

  const productFeaturesUpdate = useSelector((state) => state.productFeaturesUpdate);
  const {
    loading: loadingUpdateProductFeatures,
    error: errorUpdateProductFeatures,
    success: successUpdateProductFeatures
  } = productFeaturesUpdate;

  useEffect(() => {
    if (successUpdateProductFeatures) {
      dispatch({ type: PRODUCT_FEATURE_UPDATE_RESET });
    }
  }, [history, dispatch, successUpdateProductFeatures]);

  useEffect(() => {
    dispatch(listProductFeatures(productId));
  }, [dispatch, productId]);

  // TO DO - merge ProductFeatures and ProductFeaturesEdit
  return (
    <div className="product_features_edit">
      {loadingUpdateProductFeatures && <Loader />}
      {errorUpdateProductFeatures && <Message type="success">{errorUpdateProductFeatures}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : productFeatures?.length > 0 ? (
        <Accordion>
          {productFeatures?.map((feature, index) => (
            <Accordion.Item key={feature.featuresId}>
              <Accordion.Header index={index}>
                <Accordion.Title>{feature.featureTitle}</Accordion.Title>
                <Accordion.ButtonGroup></Accordion.ButtonGroup>
              </Accordion.Header>
              <Accordion.Body>{feature.featureContent}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Message type="success">No features</Message>
      )}
    </div>
  );
};

export default ProductFeaturesEdit;
