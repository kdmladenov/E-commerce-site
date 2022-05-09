import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import './styles/ProductSpecificationsEdit.css';
import {
  PRODUCT_SPECIFICATION_CREATE_RESET,
  PRODUCT_SPECIFICATION_UPDATE_RESET
} from '../state/constants/productConstants';
import { listProductDetails } from '../state/actions/productActions';
import {
  createProductSpecification,
  updateProductSpecification
} from '../state/actions/productSpecificationsActions';
import getProductSpecificationsInitialInputState from '../helpers/getProductSpecificationsInitialInputState';
import useTypedSelector from '../hooks/useTypedSelector';

import Message from './Message';
import Loader from './Loader';
import FormComponent from './FormComponent';

const ProductSpecificationsEdit: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ productId: string }>();

  const { product, loading, error } = useTypedSelector((state) => state.productDetails);

  const {
    success: successUpdateProductSpecification,
    loading: loadingUpdateProductSpecification,
    error: errorUpdateProductSpecification
  } = useTypedSelector((state) => state.productSpecificationUpdate);

  const {
    success: successCreateProductSpecification,
    loading: loadingCreateProductSpecification,
    error: errorCreateProductSpecification
  } = useTypedSelector((state) => state.productSpecificationCreate);

  useEffect(() => {
    if (successCreateProductSpecification) {
      dispatch({ type: PRODUCT_SPECIFICATION_CREATE_RESET });
      dispatch(listProductDetails(+params.productId));
    }
    if (successUpdateProductSpecification) {
      dispatch({ type: PRODUCT_SPECIFICATION_UPDATE_RESET });
      dispatch(listProductDetails(+params.productId));
    }
  }, [
    history,
    dispatch,
    successUpdateProductSpecification,
    successCreateProductSpecification,
    params.productId,
    product
  ]);

  return (
    <div className="product_specifications_edit">
      {loadingUpdateProductSpecification && <Loader />}
      {errorUpdateProductSpecification && (
        <Message type="error">{errorUpdateProductSpecification}</Message>
      )}
      {loadingCreateProductSpecification && <Loader />}
      {errorCreateProductSpecification && (
        <Message type="error">{errorCreateProductSpecification}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_specifications_edit_form card">
          <FormComponent
            inputData={getProductSpecificationsInitialInputState(
              JSON.parse(localStorage.getItem('allProductsList')!)
            )}
            updateAction={updateProductSpecification}
            createAction={createProductSpecification}
            getDetailsAction={listProductDetails}
            resourceId={+params.productId}
            subResourceId={product.specificationId}
            successUpdate={successUpdateProductSpecification}
            resource={product}
            mode={product.specificationId ? '' : 'create'}
          />
        </div>
      )}
    </div>
  );
};

export default ProductSpecificationsEdit;
