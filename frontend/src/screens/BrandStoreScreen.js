import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/BrandStoreScreen.css';
import { listProducts } from '../state/actions/productActions';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { productListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';

import HeaderControls from '../components/HeaderControls';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';

const BrandStoreScreen = ({ match }) => {
  const dispatch = useDispatch();
  const brand = match?.params?.brand || '';

  const [endpoint, setEndpoint] = useState(defaultEndpoint['brandStoreScreen']);

  const { products, loading, error } = useSelector((state) => state.productList);

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listProducts(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint]);

  useEffect(() => {
    setEndpoint({
      ...endpoint,
      filter: [...endpoint.filter, `filter=brand = '${brand}'`]
    });
  }, [brand]);

  return (
    <main className="brand_store">
      <div className="brand_store_container">
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="products"
          pageSizeOptionsMap={productListPageSizeOptionsMap}
          sortOptionsMap={productListSortOptionsMap}
          isGrayBackground={true}
          breadcrumbsPaths={[{ label: `${brand} store`, path: '' }]}
        />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : products.length === 0 ? (
          <h2>No items to display</h2>
        ) : (
          <div className="product_list">
            <h1>{`${brand} laptops`}</h1>
            <ul>
              {products?.map((product) => (
                <ProductCard product={product} key={product.productId} />
              ))}
            </ul>
            <div className="footer">
              <Pagination
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                totalItems={products?.[0]?.totalDBItems}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BrandStoreScreen;
