import React, { useEffect } from 'react';
import './styles/ProductSpecificationsEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import {
  PRODUCT_SPECIFICATION_CREATE_RESET,
  PRODUCT_SPECIFICATION_UPDATE_RESET
} from '../state/constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../state/actions/productActions';
import FormComponent from '../components/FormComponent';
import {
  createProductSpecification,
  updateProductSpecification
} from '../state/actions/productSpecificationsActions';
import getProductSpecificationsInitialInputState from '../helpers/getProductSpecificationsInitialInputState';

const ProductSpecificationsEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  const {
    success: successUpdateProductSpecification,
    loading: loadingUpdateProductSpecification,
    error: errorUpdateProductSpecification
  } = useSelector((state) => state.productSpecificationUpdate);

  const {
    success: successCreateProductSpecification,
    loading: loadingCreateProductSpecification,
    error: errorCreateProductSpecification
  } = useSelector((state) => state.productSpecificationCreate);

  useEffect(() => {
    if (successCreateProductSpecification) {
      dispatch({ type: PRODUCT_SPECIFICATION_CREATE_RESET });
      dispatch(listProductDetails(params.productId));
    }
    if (successUpdateProductSpecification) {
      dispatch({ type: PRODUCT_SPECIFICATION_UPDATE_RESET });
      dispatch(listProductDetails(params.productId));
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
              JSON.parse(localStorage.getItem('allProductsList'))
            )}
            updateAction={updateProductSpecification}
            createAction={createProductSpecification}
            getDetailsAction={listProductDetails}
            resourceId={params.productId}
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
