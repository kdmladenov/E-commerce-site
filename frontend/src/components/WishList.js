import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteWishFromList, listWishedItems } from '../actions/wishListActions';
import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import Rating from './Rating';
import './styles/WishList.css';
import { BASE_URL } from '../constants/constants';
import { numberDecimalFix } from '../constants/utility-functions';
import Popover from './Popover';
import RatingWidget from './RatingWidget';
import WishListCard from './WishListCard';
import SearchBox from './SearchBox';
import DropdownSelect from './DropdownSelect';
import { productListPageSizeOptionsMap, productListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';

const WishList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=price asc&',
    search: ''
  });

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading: loadingWishList, wishList, error: errorWishList } = wishListItems;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDeleteWish } = wishListDelete;

  const wishListCardsToShow = wishList?.map((wish) => <WishListCard wish={wish} />);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listWishedItems(`${page}${pageSize}${sort}${search}`));
  }, [dispatch, successDeleteWish, endpoint]);

  return (
    <div className="wish_list">
      <div className="header">
        <SearchBox
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          resource="orders"
        />
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
      {loadingWishList ? (
        <Loader />
      ) : errorWishList ? (
        <Message type="error">{errorWishList}</Message>
      ) : wishList.length === 0 ? (
        <h2>Your Wish List Is Empty</h2>
      ) : (
        <ul className="wish_list_items">{wishListCardsToShow}</ul>
      )}
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
  );
};

export default WishList;
