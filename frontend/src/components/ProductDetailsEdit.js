import React, { useEffect, useState } from 'react';
import './styles/ProductDetailsEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormComponent from '../components/FormComponent';
import { productDetailsInitialInputState } from '../constants/inputMaps';
import validateInputProduct from '../validations/productValidator';

const ProductDetailsEdit = ({ productId }) => {
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdateProduct,
    error: errorUpdateProduct,
    success: successUpdateProduct
  } = productUpdate;

  useEffect(() => {
    if (successUpdateProduct) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    }
  }, [history, dispatch, successUpdateProduct]);

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
          <div className="product_edit_go_back">
            <Link to="/admin/main/productlist">
              <Button>Go back</Button>
            </Link>
          </div>

          <h1>Edit Product Details</h1>
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

// const ProductEditScreenAdmin = ({ match, history }) => {
//   const productId = +match.params.id;

//   const [uploading, setUploading] = useState(false);

//   const dispatch = useDispatch();

//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const productUpdate = useSelector((state) => state.productUpdate);
//   const { loading: loadingUpdateProduct, error: errorUpdateProduct, success: successUpdateProduct } = productUpdate;

//   useEffect(() => {
//     if (successUpdateProduct) {
//       dispatch({ type: PRODUCT_UPDATE_RESET });
//       history.push('/admin/productlist');
//     }
//   }, [history, dispatch, successUpdateProduct]);

//   // const submitHandler = (e) => {
//   //   e.preventDefault();
//   //   dispatch(
//   //     updateProduct({
//   //       productId,
//   //       title,
//   //       brand,
//   //       image,
//   //       description,
//   //       product_category: productCategory,
//   //       price,
//   //       stock_count: stockCount,
//   //       review_count: reviewCount,
//   //       rating
//   //     })
//   //   );
//   // };

//   // const uploadFileHandler = async (e) => {
//   //   const file = e.target.files[0];
//   //   const formData = new FormData();
//   //   formData.append('image', file);
//   //   setUploading(true);
//   //   try {
//   //     const config = {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //         Authorization: `Bearer ${userInfo.token}`
//   //       }
//   //     };
//   //     const { data } = await axios.post(`${BASE_URL}/products/image`, formData, config);
//   //     setImage(data);
//   //     setUploading(false);
//   //   } catch (error) {
//   //     setUploading(false);
//   //   }
//   // };

//   return (
//     <div className="product_edit">
//       <div className="product_edit_go_back">
//         <Link to="/admin/main/productlist">
//           <Button>Go back</Button>
//         </Link>
//       </div>

//       <h1>Edit Product</h1>
//       {loadingUpdateProduct && <Loader />}
//       {errorUpdateProduct && <Message type="success">{errorUpdateProduct}</Message>}
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <FormComponent
//           inputData={productInitialInputState}
//           updateAction={updateProduct}
//           getDetailsAction={listProductDetails}
//           resourceId={productId}
//           successUpdate={successUpdateProduct}
//           resource={product}
//           validateInput={validateInputProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductEditScreenAdmin;
