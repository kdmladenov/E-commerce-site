import { useEffect, useState } from 'react';

import { listProducts } from '../state/actions/productActions';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { productListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';

import ListScreenComponent from '../components/ListScreenComponent';
import useTypedSelector from '../hooks/useTypedSelector';
import { RouteComponentProps } from 'react-router-dom';

const ProductListScreen: React.FC<
  RouteComponentProps<{
    searchTerm: string;
  }>
> = ({ match }) => {
  const { searchTerm } = match?.params;

  const [endpoint, setEndpoint] = useState(defaultEndpoint['productListScreen']);

  const { loading, products, error } = useTypedSelector((state) => state.productList);

  useEffect(() => {
    setEndpoint({
      ...endpoint,
      search: `search=${searchTerm ? searchTerm : ''}&`
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
      // localStorageId="allProductsList"
      defaultEndpoint={defaultEndpoint['productListScreen']}
      resourceName={'products'}
      pageSizeOptionsMap={productListPageSizeOptionsMap}
      sortOptionsMap={productListSortOptionsMap}
      breadcrumbsPaths={[{ label: 'Product List', path: '' }]}
    />
  );
};

export default ProductListScreen;
