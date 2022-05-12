import React, { useEffect, useState } from 'react';

import { listWishedItems } from '../state/actions/wishListActions';
// import getSidebarInput from '../helpers/getSidebarInput';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { productListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import useTypedSelector from '../hooks/useTypedSelector';

import ListScreenComponent from '../components/ListScreenComponent';

const WishListScreen = () => {
  const [endpoint, setEndpoint] = useState(defaultEndpoint['wishListScreen']);

  // const allMyWishList = JSON.parse(localStorage.getItem('allMyWishList')!);

  const { loading, wishList, error } = useTypedSelector((state) => state.wishListItems);

  const { success: successDelete } = useTypedSelector((state) => state.wishListDelete);

  // const [sidebarInputMap, setSidebarInputMap] = useState(getSidebarInput(allMyWishList));

  // useEffect(() => {
  //   setSidebarInputMap(getSidebarInput(allMyWishList));
  // }, [successDelete]);

  return (
    <ListScreenComponent
      endpoint={endpoint}
      setEndpoint={setEndpoint}
      listAction={listWishedItems}
      loading={loading}
      resource={wishList}
      error={error}
      // localStorageId="allMyWishList"
      // sidebarInputMap={sidebarInputMap}
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
