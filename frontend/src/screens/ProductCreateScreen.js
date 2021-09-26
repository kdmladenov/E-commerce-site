import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './styles/ProductEditScreen.css';
import { createProduct, listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import productCategoriesEnum from '../constants/product-categories.enum';

const ProductCreateScreen = ({ match, history }) => {
  // const productId = +match.params.id;

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  // const productDetails = useSelector((state) => state.productDetails);
  // const { loading, error, product } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push('/admin/productlist');
    }
  }, [history, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        title,
        brand,
        image,
        description,
        product_category: productCategory,
        price,
        stock_count: stockCount,
        review_count: reviewCount,
        rating
      })
    );
  };

  return (
    <div className="product_create">
      <div className="product_create_go_back">
        <Link to="/admin/productlist">
          <Button>Go back</Button>
        </Link>
      </div>

      <h1>Create Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <form>
          <div className="form_left">
            <h5>Title</h5>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h5>Brand</h5>
            <input
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <h5>Product Category</h5>
            <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
              {Object.keys(productCategoriesEnum).map((category) => (
                <option>{category}</option>
              ))}
            </select>
            <h5>Image</h5>
            <input
              type="text"
              placeholder="Enter Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <h5>Description</h5>
            <textarea
              type="text"
              rows={10}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form_right">
            <h5>Price</h5>
            <input
              type="number"
              placeholder="Enter Price"
              value={price}
              min={0}
              max={10000}
              onChange={(e) => setPrice(+e.target.value)}
            />
            <h5>Count In Stock</h5>
            <input
              type="number"
              placeholder="Enter Count in Stock"
              value={stockCount}
              min={0}
              max={1000}
              onChange={(e) => setStockCount(+e.target.value)}
            />
            <h5>Reviews Count</h5>
            <input
              type="number"
              placeholder="Enter Count of Reviews"
              value={reviewCount}
              min={0}
              max={1000}
              onChange={(e) => setReviewCount(+e.target.value)}
            />
            <h5>Rating</h5>
            <input
              type="number"
              placeholder="Enter Rating"
              value={rating}
              min={0}
              max={5}
              onChange={(e) => setRating(+e.target.value)}
            />
          </div>
          <div className="product_create_btn">
            <Button onClick={submitHandler}>Create Product</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductCreateScreen;
