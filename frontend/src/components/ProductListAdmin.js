import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './styles/OrderList.css';
import Accordion from './Accordion';
import SearchBox from './SearchBox';
import DropdownSelect from './DropdownSelect';
import { adminListPageSizeOptionsMap, adminProductListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import { deleteProduct, listProducts } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Tooltip from './Tooltip';

const ProductListAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
  const deleteProductHandler = (productId) => {
    window.confirm('Are your sure you want to delete this product?');
    dispatch(deleteProduct(productId));
  };

  const createProductHandler = () => {
    history.push(`/admin/product/create`);
  };


  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=product_id asc&',
    search: ''
  });

useEffect(() => {
  dispatch({ type: PRODUCT_CREATE_RESET });
  if (userInfo?.role !== 'admin') {
    history.push('/login');
  }
  if (successCreate) {
    history.push(`/admin/product/${createdProduct.productId}/edit`);
  } else {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listProducts(`${page}${pageSize}${sort}${search}`));
  }
}, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, endpoint]);


  return (
    <div className="product_list_admin_container">
      <div className="header">
        <Button classes="icon" onClick={createProductHandler}>
          <i className="fas fa-plus" /> Create Product
        </Button>
        <SearchBox
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          resource="products"
        />
        <div className="dropdown_group_container">
          <DropdownSelect
            name="pageSize"
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            labelStart="Page size"
            optionsMap={adminListPageSizeOptionsMap}
          />
          <DropdownSelect
            name="sort"
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            labelStart="Sort by"
            optionsMap={adminProductListSortOptionsMap}
          />
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products?.length > 0 ? (
        <Accordion>
          {products
            ?.sort((a, b) => a.productId - b.productId)
            .map((product) => (
              <Accordion.Item key={product.productId}>
                <Accordion.Header>
                  <Accordion.Title>product</Accordion.Title>
                  <Accordion.ButtonGroup>
                    <div className="button_group">
                      <Link to={`/admin/product/${product.productId}/edit`}>
                        <Button classes="icon">
                          <Tooltip text="Edit">
                            <i className="fa fa-edit"></i>
                          </Tooltip>
                        </Button>
                      </Link>
                      <Button
                        classes="icon"
                        onClick={() => deleteProductHandler(product.productId)}
                      >
                        <Tooltip text="Delete">
                          <i className="fas fa-trash"></i>
                        </Tooltip>
                      </Button>
                    </div>
                  </Accordion.ButtonGroup>
                </Accordion.Header>
                <Accordion.Body>ProductScreen</Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      ) : (
        <h2>You have no orders</h2>
      )}
      <div className="footer">
        {products?.length > 0 && (
          <Pagination
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
            pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
            totalItems={products[0].totalDBItems}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListAdmin;
