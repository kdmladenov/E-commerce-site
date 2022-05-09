import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProductFeaturesEdit.css';
import { listProductFeatures } from '../state/actions/productFeaturesActions';
import useTypedSelector from '../hooks/useTypedSelector';

import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import ProductFeatureCardForm from './ProductFeatureCardForm';

const ProductFeaturesEdit: React.FC<{ productId: number }> = ({ productId }) => {
  const dispatch = useDispatch();

  const [createMode, setCreateMode] = useState(false);

  const { productFeatures, loading, error } = useTypedSelector(
    (state) => state.productFeaturesList
  );

  const { success: successCreate } = useTypedSelector((state) => state.productFeaturesCreate);

  const { success: successDelete } = useTypedSelector((state) => state.productFeaturesDelete);

  useEffect(() => {
    dispatch(listProductFeatures(productId));
  }, [dispatch, productId, successCreate, successDelete]);

  // TO DO - merge ProductFeatures and ProductFeaturesEdit
  return (
    <div className="product_features_edit">
      {loading && <Loader />}
      {error && <Message type="success">{error}</Message>}
      {createMode ? (
        <ProductFeatureCardForm
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
          .map((feature) => <ProductFeatureCardForm {...feature} />)
      ) : (
        <Message type="success">No features</Message>
      )}
    </div>
  );
};

export default ProductFeaturesEdit;
