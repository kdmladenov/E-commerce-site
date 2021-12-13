import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import {
  productListPageSizeOptionsMap,
  productListSidebarInput,
  productListSortOptionsMap
} from '../constants/inputMaps';
import './styles/ProductListScreen.css';
import HeaderControls from '../components/HeaderControls';

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const searchTerm = match?.params?.searchTerm || '';

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    filter: [],
    search: ''
  });

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listProducts(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint]);

  useEffect(() => {
    setEndpoint({
      ...endpoint,
      search: `search=${searchTerm}&`
    });
  }, [searchTerm]);

  const productsToShow = (
    <ul>
      {products?.map((product) => (
        <li className="product_list_item card" key={product.productId}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );

  return (
    <main className="product_list_container">
      <Sidebar endpoint={endpoint} setEndpoint={setEndpoint} inputMap={productListSidebarInput} />
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="products"
        pageSizeOptionsMap={productListPageSizeOptionsMap}
        sortOptionsMap={productListSortOptionsMap}
        isGrayBackground={true}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="product_list">
          {productsToShow}
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
      )}
    </main>
  );
};

export default ProductListScreen;
