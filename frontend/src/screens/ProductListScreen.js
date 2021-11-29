import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import {
  productListPageSizeSelect,
  productListSidebarInput,
  productListSortSelect
} from '../constants/inputMaps';
import './styles/ProductListScreen.css';

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const searchTerm = match.params?.searchTerm || '';

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
          <ProductCard
            id={product.productId}
            title={product.title}
            image={product.image}
            price={product.price}
            rating={product.rating}
            stockCount={product.stockCount}
            reviewCount={product.reviewCount}
            ratingMap={{
              1: product.starOne || 0,
              2: product.starTwo || 0,
              3: product.starThree || 0,
              4: product.starFour || 0,
              5: product.starFive || 0
            }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <main className="product_list_container">
      <Sidebar endpoint={endpoint} setEndpoint={setEndpoint} inputMap={productListSidebarInput} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="product_list">
          <div className="header">
            <select
              name="pageSize"
              onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
            >
              <option value="">{`Page size ${
                productListPageSizeSelect.find((item) => item.value === endpoint.pageSize).label
              }`}</option>
              {productListPageSizeSelect
                .filter((size) => size.value !== endpoint.pageSize)
                .map((size) => (
                  <option key={size.label} value={size.value}>
                    {size.label}
                  </option>
                ))}
            </select>
            <select
              name="sort"
              onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
            >
              <option value="">{`Sort by: ${
                productListSortSelect.find((item) => item.value === endpoint.sort).label
              }`}</option>
              {productListSortSelect
                .filter((item) => item.value !== endpoint.sort)
                .map((item) => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          {productsToShow}
          <div className="footer">
            {products?.length > 0 && (
              <Pagination
                updatePagingQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
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
