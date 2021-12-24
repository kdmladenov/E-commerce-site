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

// const ProductEditScreenAdmin = ({ match, history }) => {
//   const productId = +match.params.id;

//   const [title, setTitle] = useState('');
//   const [brand, setBrand] = useState('');
//   const [image, setImage] = useState('');
//   const [description, setDescription] = useState('');
//   const [productCategory, setProductCategory] = useState('');
//   const [price, setPrice] = useState(0);
//   const [stockCount, setStockCount] = useState(0);
//   const [reviewCount, setReviewCount] = useState(0);
//   const [rating, setRating] = useState(0);

//   const [uploading, setUploading] = useState(false);

//   const dispatch = useDispatch();

//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const productUpdate = useSelector((state) => state.productUpdate);
//   const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: PRODUCT_UPDATE_RESET });
//     } else {
//       if (!product.title || product.productId !== productId) {
//         dispatch(listProductDetails(productId));
//       } else {
//         setTitle(product.title);
//         setBrand(product.brand);
//         setImage(product.image);
//         setDescription(product.description);
//         setProductCategory(product.productCategory);
//         setPrice(product.price);
//         setStockCount(product.stockCount);
//         setReviewCount(product.reviewCount);
//         setRating(product.rating);
//       }
//     }
//   }, [
//     history,
//     dispatch,
//     productId,
//     product.title,
//     product.productId,
//     product.brand,
//     product.image,
//     product.description,
//     product.productCategory,
//     product.price,
//     product.stockCount,
//     product.reviewCount,
//     product.rating,
//     successUpdate
//   ]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       updateProduct({
//         productId,
//         title,
//         brand,
//         image,
//         description,
//         product_category: productCategory,
//         price,
//         stock_count: stockCount,
//         review_count: reviewCount,
//         rating
//       })
//     );
//   };

//   const uploadFileHandler = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);
//     setUploading(true);
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${userInfo.token}`
//         }
//       };
//       const { data } = await axios.post(`${BASE_URL}/products/image`, formData, config);
//       setImage(data);
//       setUploading(false);
//     } catch (error) {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="product_edit">
//       <div className="product_edit_go_back">
//         <Link to="/admin/productlist">
//           <Button>Go back</Button>
//         </Link>
//       </div>

//       <h1>Edit Product</h1>
//       {loadingUpdate && <Loader />}
//       {errorUpdate && <Message type="success">{errorUpdate}</Message>}
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <form>
//           <div className="form_left">
//             <h5>Title</h5>
//             <input
//               type="text"
//               placeholder="Enter Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <h5>Brand</h5>
//             <input
//               type="text"
//               placeholder="Enter Brand"
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//             />
//             <h5>Product Category</h5>
//             <select
//               defaultValue={product.productCategory}
//               onChange={(e) => setProductCategory(e.target.value)}
//             >
//               {Object.keys(productCategoriesEnum).map((category) => (
//                 <option>{category}</option>
//               ))}
//             </select>
//             <h5>Image</h5>
//             <input
//               type="text"
//               placeholder="Enter Image"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//             />
//             Or
//             <input
//               type="file"
//               label="Choose file"
//               placeholder="Upload Image"
//               onChange={uploadFileHandler}
//             />
//             {uploading && <Loader />}
//             <h5>Description</h5>
//             <textarea
//               type="text"
//               rows={10}
//               placeholder="Enter Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="form_right">
//             <h5>Price</h5>
//             <input
//               type="number"
//               placeholder="Enter Price"
//               value={price}
//               min={0}
//               max={10000}
//               onChange={(e) => setPrice(+e.target.value)}
//             />
//             <h5>Count In Stock</h5>
//             <input
//               type="number"
//               placeholder="Enter Count in Stock"
//               value={stockCount}
//               min={0}
//               max={1000}
//               onChange={(e) => setStockCount(+e.target.value)}
//             />
//             <h5>Reviews Count</h5>
//             <input
//               type="number"
//               placeholder="Enter Count of Reviews"
//               value={reviewCount}
//               min={0}
//               max={1000}
//               onChange={(e) => setReviewCount(+e.target.value)}
//             />
//             <h5>Rating</h5>
//             <input
//               type="number"
//               placeholder="Enter Rating"
//               value={rating}
//               min={0}
//               max={5}
//               onChange={(e) => setRating(+e.target.value)}
//             />
//           </div>
//           <div className="product_edit_btn">
//             <Button onClick={submitHandler}>Edit Product</Button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ProductEditScreenAdmin;
