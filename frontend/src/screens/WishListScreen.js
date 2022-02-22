import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listWishedItems } from '../state/actions/wishListActions';
import {
  defaultEndpoint,
  productListPageSizeOptionsMap,
  productListSortOptionsMap,
  sidebarInput
} from '../constants/inputMaps';
import ListScreenComponent from '../components/ListScreenComponent';

const WishListScreen = () => {
  const [endpoint, setEndpoint] = useState(defaultEndpoint['wishListScreen']);

  const allMyWishList = JSON.parse(localStorage.getItem('allMyWishList'));

  const { loading, wishList, error } = useSelector((state) => state.wishListItems);

  const { success: successDelete } = useSelector((state) => state.wishListDelete);

  const [sidebarInputMap, setSidebarInputMap] = useState(sidebarInput(allMyWishList));

  useEffect(() => {
    setSidebarInputMap(sidebarInput(allMyWishList));
  }, [successDelete]);

  return (
    <ListScreenComponent
      endpoint={endpoint}
      setEndpoint={setEndpoint}
      listAction={listWishedItems}
      loading={loading}
      resource={wishList}
      error={error}
      sidebarInputMap={sidebarInputMap}
      defaultEndpoint={defaultEndpoint['wishListScreen']}
      resourceName={'wish list'}
      pageSizeOptionsMap={productListPageSizeOptionsMap}
      sortOptionsMap={productListSortOptionsMap}
      breadcrumbsPaths={[
        { label: 'Profile', path: `/account/profile` },
        { label: 'Wish List', path: '' }
      ]}
      successDelete={successDelete}
    />
  );
};

export default WishListScreen;
