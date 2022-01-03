import React, { useEffect, useState } from 'react';
import './styles/ProductFeaturesEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductFeatures } from '../actions/productFeaturesActions';
import Button from './Button';
import ProductFeatureEditCard from './ProductFeatureEditCard';

const ProductFeaturesEdit = ({ productId }) => {
  const dispatch = useDispatch();

  const [createMode, setCreateMode] = useState(false);

  const productFeaturesList = useSelector((state) => state.productFeaturesList);
  const { productFeatures, loading, error } = productFeaturesList;

  const productFeaturesCreate = useSelector((state) => state.productFeaturesCreate);
  const { success: successCreate } = productFeaturesCreate;

  const productFeaturesDelete = useSelector((state) => state.productFeaturesDelete);
  const { success: successDelete } = productFeaturesDelete;

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
