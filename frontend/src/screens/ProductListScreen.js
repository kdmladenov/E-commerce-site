import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  defaultEndpoint,
  productListPageSizeOptionsMap,
  productListSortOptionsMap
} from '../constants/inputMaps';
import ListScreenComponent from '../components/ListScreenComponent';
import { listProducts } from '../actions/productActions';

const ProductListScreen = ({ match }) => {
  const searchTerm = match?.params?.searchTerm || '';

  const [endpoint, setEndpoint] = useState(defaultEndpoint['productListScreen']);

  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  useEffect(() => {
    setEndpoint({
      ...endpoint,
      search: `search=${searchTerm}&`
    });
  }, [searchTerm]);

  return (
    <ListScreenComponent
      endpoint={endpoint}
      setEndpoint={setEndpoint}
      listAction={listProducts}
      loading={loading}
      resource={products}
      error={error}
      localStorageId={'allProductsList'}
      defaultEndpoint={defaultEndpoint['productListScreen']}
      resourceName={'products'}
      pageSizeOptionsMap={productListPageSizeOptionsMap}
      sortOptionsMap={productListSortOptionsMap}
      breadcrumbsPaths={[{ label: 'Product List', path: '' }]}
    />
  );
};

export default ProductListScreen;
