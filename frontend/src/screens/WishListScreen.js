import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listWishedItems } from '../actions/wishListActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import {
  productListPageSizeOptionsMap,
  productListSortOptionsMap,
  sidebarInput
} from '../constants/inputMaps';
import './styles/WishListScreen.css';
import WishListCard from '../components/WishListCard';
import Pagination from '../components/Pagination';
import HeaderControls from '../components/HeaderControls';
import { getRibbonText } from '../constants/utility-functions';

const defaultEndpoint = {
  page: 'page=1&',
  pageSize: 'pageSize=12&',
  sort: 'sort=dateCreated desc&',
  filter: [],
  search: ''
};

const WishListScreen = () => {
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState(defaultEndpoint);

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading, wishList, error } = wishListItems;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDelete } = wishListDelete;

    const [sidebarInputMap, setSidebarInputMap] = useState(
      sidebarInput(JSON.parse(localStorage.getItem('allMyWishList')))
    );

  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listWishedItems(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDelete]);

    useEffect(() => {
      setSidebarInputMap(sidebarInput(JSON.parse(localStorage.getItem('allMyWishList'))));
    }, [successDelete, sidebarInputMap]);

  return (
    <main className="wish_list_screen_container">
      <Sidebar
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        inputMap={sidebarInputMap}
        defaultEndpoint={defaultEndpoint}
      />
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="reviews"
        pageSizeOptionsMap={productListPageSizeOptionsMap}
        sortOptionsMap={productListSortOptionsMap}
        isGrayBackground={true}
        breadcrumbsPaths={[
          { label: 'Profile', path: `/account/profile` },
          { label: 'Wish List', path: '' }
        ]}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : wishList.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="wish_list_screen">
          <ul>
            {wishList?.map((wish) => (
              <WishListCard
                wish={wish}
                key={wish.wishListId}
                ribbonText={getRibbonText(wish.productId)}
              />
            ))}
          </ul>
          <div className="footer">
            {wishList?.length > 0 && (
              <Pagination
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                totalItems={wishList[0].totalDBItems}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default WishListScreen;
