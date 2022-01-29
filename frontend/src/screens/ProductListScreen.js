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
  productListSortOptionsMap,
  sidebarInput
} from '../constants/inputMaps';
import './styles/ProductListScreen.css';
import HeaderControls from '../components/HeaderControls';
import { getRibbonText } from '../constants/utility-functions';
import Button from '../components/Button';

const defaultEndpoint = {
  page: 'page=1&',
  pageSize: 'pageSize=12&',
  sort: 'sort=price asc&',
  filter: [],
  search: ''
};

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const searchTerm = match?.params?.searchTerm || '';

  const [horizontalCards, setHorizontalCards] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);

  const [endpoint, setEndpoint] = useState(defaultEndpoint);

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

  return (
    <main className={`product_list_container ${!hiddenSidebar ? 'hidden_sidebar' : ''}`}>
      <Sidebar
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        inputMap={sidebarInput(JSON.parse(localStorage.getItem('allProductsList')))}
        defaultEndpoint={defaultEndpoint}
      />
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="products"
        pageSizeOptionsMap={productListPageSizeOptionsMap}
        sortOptionsMap={productListSortOptionsMap}
        isGrayBackground={true}
        breadcrumbsPaths={[{ label: 'Product List', path: '' }]}
        horizontalCards={horizontalCards}
        setHorizontalCards={setHorizontalCards}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : products.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className={`product_list ${horizontalCards ? 'horizontal' : ''}`}>
          <ul>
            {products?.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                horizontal={horizontalCards}
                ribbonText={getRibbonText(product.productId)}
              />
            ))}
          </ul>
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
      <Button classes="icon sidebar_toggle_btn" onClick={() => setHiddenSidebar(!hiddenSidebar)}>
        <i className={`fas fa-chevron-circle-${hiddenSidebar ? 'left' : 'right'}`} />
      </Button>
    </main>
  );
};

export default ProductListScreen;
