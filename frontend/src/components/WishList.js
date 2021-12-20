import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listWishedItems } from '../actions/wishListActions';
import Loader from './Loader';
import Message from './Message';
import './styles/WishList.css';
import WishListCard from './WishListCard';
import { productListPageSizeOptionsMap, productListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';

const WishList = ({ isCarousel = false }) => {
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

  const wishListCardsToShow = wishList?.map((wish) => (
    <WishListCard wish={wish} key={wish.wishListId} />
  ));

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listWishedItems(`${page}${pageSize}${sort}${search}`));
  }, [dispatch, successDeleteWish, endpoint]);

  return (
    <div className={`wish_list ${isCarousel ? 'horizontal': ''}`}>
      {!isCarousel && (
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="wish list"
          pageSizeOptionsMap={productListPageSizeOptionsMap}
          sortOptionsMap={productListSortOptionsMap}
        />
      )}
      {loadingWishList ? (
        <Loader />
      ) : errorWishList ? (
        <Message type="error">{errorWishList}</Message>
      ) : wishList.length === 0 ? (
        <h2>Your Wish List Is Empty</h2>
      ) : (
        <ul className="wish_list_items">{wishListCardsToShow}</ul>
      )}
      {!isCarousel && (
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
      )}
    </div>
  );
};

export default WishList;
