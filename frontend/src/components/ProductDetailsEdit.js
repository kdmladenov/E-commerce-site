import React, { useEffect } from 'react';
import './styles/ProductDetailsEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormComponent from '../components/FormComponent';
import { productDetailsInitialInputState } from '../constants/inputMaps';
import validateInputProduct from '../validations/productValidator';

const ProductDetailsEdit = ({ productId }) => {
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

  useEffect(() => {
    if (successUpdateProduct) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [history, dispatch, successUpdateProduct]);

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, []);

  return (
    <div className="product_details_edit">
      {loadingUpdateProduct && <Loader />}
      {errorUpdateProduct && <Message type="success">{errorUpdateProduct}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_details_edit_form card">
          {/* <div className="product_edit_go_back">
            <Link to="/admin/main/productlist">
              <Button>Go back</Button>
            </Link>
          </div> */}
          {/* <h1>Edit Product Details</h1> */}
          <FormComponent
            inputData={productDetailsInitialInputState}
            updateAction={updateProduct}
            getDetailsAction={listProductDetails}
            resourceId={productId}
            successUpdate={successUpdateProduct}
            resource={product}
            validateInput={validateInputProduct}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsEdit;
