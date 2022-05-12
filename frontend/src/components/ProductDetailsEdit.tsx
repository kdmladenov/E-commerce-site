import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './styles/ProductDetailsEdit.css';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../state/constants/productConstants';
import { createProduct, listProductDetails, updateProduct } from '../state/actions/productActions';
import validateInputProduct from '../validations/productValidator';
import productDetailsInitialInputState from '../inputs/productDetailsInitialInputState';
import useTypedSelector from '../hooks/useTypedSelector';

import Message from './Message';
import Loader from './Loader';
import FormComponent from './FormComponent';

const ProductDetailsEdit: React.FC<{ productId: number }> = ({ productId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { loading, error, product } = useTypedSelector((state) => state.productDetails);

  const {
    product: createdProduct,
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate
  } = useTypedSelector((state) => state.productCreate);

  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate
  } = useTypedSelector((state) => state.productUpdate);

  useEffect(() => {
    if (userInfo?.role !== 'admin') {
      history.push('/login');
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      dispatch(listProductDetails(createdProduct.productId));
      history.push(`/admin/products/${createdProduct.productId}/edit/details`);
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [history, dispatch, successUpdate, createdProduct, successCreate, userInfo, productId]);

  useEffect(() => {
    productId && dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <div className="product_details_edit">
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message type="error">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_details_edit_form card">
          <FormComponent
            inputData={productDetailsInitialInputState}
            updateAction={updateProduct}
            createAction={createProduct}
            getDetailsAction={listProductDetails}
            resourceId={productId}
            successUpdate={successUpdate}
            resource={product}
            validateInput={validateInputProduct}
            mode={productId ? '' : 'create'}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsEdit;
