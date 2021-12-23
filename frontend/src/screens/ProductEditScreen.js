import React, { useState } from 'react';
import ProductDetailsEdit from '../components/ProductDetailsEdit';
import ProductSpecificationsEdit from '../components/ProductSpecificationsEdit';
import './styles/ProductEditScreen.css';

const ProductEditScreen = ({ match }) => {
  const productId = match.params.productId;

  const [activeTab, setActiveTab] = useState('details');

  return (
    <main className="product_edit_screen">
      <div className="product_edit_container">
        <div className="header card">
          <button
            className={`tab ${activeTab === 'details' && 'active'}`}
            onClick={() => setActiveTab('details')}
          >
            Edit Product Details
          </button>
          <button
            className={`tab ${activeTab === 'specifications' && 'active'}`}
            onClick={() => setActiveTab('specifications')}
          >
            Edit Product Specifications
          </button>
          <button
            className={`tab ${activeTab === 'features' && 'active'}`}
            onClick={() => setActiveTab('features')}
          >
            Edit Product Features
          </button>
        </div>
        <section
          className={`product_details_edit_container content ${
            activeTab === 'details' && 'active'
          }`}
        >
          <ProductDetailsEdit productId={productId} />
        </section>
        <section
          className={`product_specifications_edit_container content ${
            activeTab === 'specifications' && 'active'
          }`}
        >
          <ProductSpecificationsEdit productId={productId} />
        </section>
        <section
          className={`product_features_edit_container content ${
            activeTab === 'features' && 'active'
          }`}
        >
          Features
          {/* <ProductListAdmin /> */}
        </section>
      </div>
    </main>
  );
};

export default ProductEditScreen;


// import React, { useEffect, useState } from 'react';
// import Button from '../components/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import './styles/ProductEditScreenAdmin.css';
// import { listProductDetails, updateProduct } from '../actions/productActions';
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
// import productCategoriesEnum from '../constants/product-categories.enum';
// import axios from 'axios';
// import { BASE_URL } from '../constants/constants';
// import FormComponent from '../components/FormComponent';
// import { productInitialInputState } from '../constants/inputMaps';
// import validateInputProduct from '../validations/productValidator';

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