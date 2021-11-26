import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import ProductsSidebar from '../components/ProductsSidebar';
import { PAGING } from '../constants/constants';
import { productsDatabase } from '../constants/for-developing/productsDatabase';
import { checkBoxInput } from '../constants/ProductListSidebarInputs';
import { endpointMapper } from '../constants/utility-functions/utility-functions';
import './styles/ProductListScreen.css';

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const searchTerm = match.params?.searchTerm;
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
  const pageSizeSelect = [
    { label: 12, value: 'pageSize=12&' },
    { label: 16, value: 'pageSize=16&' },
    { label: 20, value: 'pageSize=20&' }
  ];

  const sortSelect = [
    { label: 'Price: Low to High', value: 'sort=price asc&' },
    { label: 'Price: High to Low', value: 'sort=price desc&' },
    { label: 'Avg. Customer Rating', value: 'sort=rating desc&' },
    { label: 'Newest first', value: 'sort=dateCreated desc&' },
    { label: 'Oldest first', value: 'sort=dateCreated asc&' }
  ];

  const filterHandler = (e) => {
    if (e.target.checked) {
      setEndpoint({
        ...endpoint,
        filter: [...endpoint[`filter`], e.target.value]
      });
    } else if (!e.target.checked) {
      setEndpoint({
        ...endpoint,
        filter: [...endpoint[`filter`].filter((query) => query !== e.target.value)]
      });
    }
  };

  return (
    <main className="product_list_container">
      <div className="sidebar">
        {Object.keys(checkBoxInput).map((fieldset) => (
          <fieldset>
            <legend>{fieldset}</legend>
            {checkBoxInput[fieldset].map((checkboxInput) => (
              <div>
                <input
                  type={checkboxInput.type}
                  value={checkboxInput.value}
                  onChange={(e) => filterHandler(e)}
                ></input>
                <label>{checkboxInput.label}</label>
              </div>
            ))}
          </fieldset>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="product_list">
          <div className="header">
            <div className="breadcrumbs"></div>
            <div className="filters">
              <select
                name="pageSize"
                onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
              >
                <option value="">{`Page size ${
                  pageSizeSelect.find((item) => item.value === endpoint.pageSize).label
                }`}</option>
                {pageSizeSelect
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
                  sortSelect.find((item) => item.value === endpoint.sort).label
                }`}</option>
                {sortSelect
                  .filter((item) => item.value !== endpoint.sort)
                  .map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {productsToShow}
        </div>
      )}
    </main>
  );
};

export default ProductListScreen;
