import React, { useEffect } from 'react';
import './styles/ProductDetailsEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createProduct, listProductDetails, updateProduct } from '../actions/productActions';
import FormComponent from '../components/FormComponent';
import { productDetailsInitialInputState } from '../constants/inputMaps';
import validateInputProduct from '../validations/productValidator';

const ProductDetailsEdit = ({ productId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

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
