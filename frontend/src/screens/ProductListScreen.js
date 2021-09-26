import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './styles/ProductListScreen.css';
import { numberDecimalFix } from '../constants/utility-functions.js/utility-functions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo?.role !== 'admin') {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct.productId}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteProductHandler = (productId) => {
    window.confirm('Are your sure you want to delete this product?');
    dispatch(deleteProduct(productId));
  };

  const createProductHandler = () => {
      history.push(`/admin/product/create`);
  };

  return (
    <div className="user_list container">
      <div className="create_product">
        <h1>Products</h1>
        <Button types="blue" onClick={createProductHandler}>
          <i className="fas fa-plus" /> Create Product
        </Button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIVE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products
              .sort((a, b) => a.productId - b.productId)
              .map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.title}</td>
                  <td>$ {numberDecimalFix(product.price)} </td>
                  <td>{product.productCategory}</td>
                  <td>{product.brand}</td>
                  <td>
                    {!product.isDeleted ? (
                      <i className="fa fa-check" style={{ color: 'green' }}></i>
                    ) : (
                      <i className="fa fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  {!product.isDeleted && (
                    <td>
                      <Link to={`/admin/product/${product.productId}/edit`}>
                        <Button types="icon">
                          <i className="fa fa-edit"></i>
                        </Button>
                      </Link>

                      <Button types="icon" onClick={() => deleteProductHandler(product.productId)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;
