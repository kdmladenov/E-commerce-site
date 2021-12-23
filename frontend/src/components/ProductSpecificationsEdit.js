import React, { useEffect } from 'react';
import './styles/ProductSpecificationsEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  PRODUCT_SPECIFICATION_UPDATE_RESET,
  PRODUCT_UPDATE_RESET
} from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import FormComponent from '../components/FormComponent';
import { productSpecificationsInitialInputState } from '../constants/inputMaps';
import { updateProductSpecification } from '../actions/productSpecificationsActions';

const ProductSpecificationsEdit = ({ productId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdateProduct,
    error: errorUpdateProduct,
    success: successUpdateProduct
  } = productUpdate;

  const productSpecificationUpdate = useSelector((state) => state.productSpecificationUpdate);
  const {
    loading: loadingUpdateProductSpecification,
    error: errorUpdateProductSpecification,
    success: successUpdateProductSpecification
  } = productSpecificationUpdate;

  useEffect(() => {
    if (successUpdateProduct) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    if (successUpdateProductSpecification) {
      dispatch({ type: PRODUCT_SPECIFICATION_UPDATE_RESET });
    }
  }, [history, dispatch, successUpdateProduct, successUpdateProductSpecification]);

  return (
    <div className="product_specifications_edit">
      {loadingUpdateProduct && <Loader />}
      {errorUpdateProduct && <Message type="success">{errorUpdateProduct}</Message>}
      {loadingUpdateProductSpecification && <Loader />}
      {errorUpdateProductSpecification && (
        <Message type="success">{errorUpdateProductSpecification}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_specifications_edit_form card">
          <FormComponent
            inputData={productSpecificationsInitialInputState}
            updateAction={updateProductSpecification}
            getDetailsAction={listProductDetails}
            resourceId={product.specificationId}
            successUpdate={successUpdateProductSpecification}
            resource={product}
          />
        </div>
      )}
    </div>
  );
};

export default ProductSpecificationsEdit;
