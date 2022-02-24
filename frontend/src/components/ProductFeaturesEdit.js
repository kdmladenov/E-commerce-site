import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/ProductFeaturesEdit.css';
import { listProductFeatures } from '../state/actions/productFeaturesActions';

import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import ProductFeatureEditCard from './ProductFeatureEditCard';

const ProductFeaturesEdit = ({ productId }) => {
  const dispatch = useDispatch();

  const [createMode, setCreateMode] = useState(false);

  const { productFeatures, loading, error } = useSelector((state) => state.productFeaturesList);

  const { success: successCreate } = useSelector((state) => state.productFeaturesCreate);

  const { success: successDelete } = useSelector((state) => state.productFeaturesDelete);

  useEffect(() => {
    dispatch(listProductFeatures(productId));
  }, [dispatch, productId, successCreate, successDelete]);

  // TO DO - merge ProductFeatures and ProductFeaturesEdit
  return (
    <div className="product_features_edit">
      {loading && <Loader />}
      {error && <Message type="success">{error}</Message>}
      {createMode ? (
        <ProductFeatureEditCard
          createMode={createMode}
          setCreateMode={setCreateMode}
          productId={productId}
        />
      ) : (
        <Button classes="white rounded" onClick={() => setCreateMode(true)}>
          Add new feature
        </Button>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : productFeatures?.length > 0 ? (
        productFeatures
          ?.sort((a, b) => b.featureId - a.featureId)
          .map((feature) => <ProductFeatureEditCard {...feature} />)
      ) : (
        <Message type="success">No features</Message>
      )}
    </div>
  );
};

export default ProductFeaturesEdit;
