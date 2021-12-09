import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listWishedItems } from '../actions/wishListActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  productListPageSizeOptionsMap,
  productListSidebarInput,
  productListSortOptionsMap
} from '../constants/inputMaps';
import './styles/WishListScreen.css';
import WishListCard from '../components/WishListCard';
import Pagination from '../components/Pagination';
import DropdownSelect from '../components/DropdownSelect';

const WishListScreen = () => {
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateCreated desc&',
    filter: [],
    search: ''
  });

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading, wishList, error } = wishListItems;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDelete } = wishListDelete;

  const wishListCardsToShow = wishList?.map((wish) => <WishListCard wish={wish} />);


  useEffect(() => {
    const { page, pageSize, sort, search, filter } = endpoint;

    dispatch(listWishedItems(`${page}${pageSize}${sort}${search}${filter.join('&')}`));
  }, [dispatch, endpoint, successDelete]);

  return (
    <main className="wish_list_container">
      <Sidebar endpoint={endpoint} setEndpoint={setEndpoint} inputMap={productListSidebarInput} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : wishList.length === 0 ? (
        <h2>No items to display</h2>
      ) : (
        <div className="wish_list">
          <div className="header">
            <div className="breadcrumbs_container">
              <Breadcrumbs />
            </div>
            <div className="dropdown_group_container">
              <DropdownSelect
                name="pageSize"
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                query={endpoint}
                labelStart="Page size"
                optionsMap={productListPageSizeOptionsMap}
              />
              <DropdownSelect
                name="sort"
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                query={endpoint}
                labelStart="Sort by"
                optionsMap={productListSortOptionsMap}
              />
            </div>
          </div>
          <ul>{wishListCardsToShow}</ul>
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
