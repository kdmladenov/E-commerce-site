import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/WishList.css';
import { listWishedItems } from '../state/actions/wishListActions';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { productListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import getRibbonText from '../helpers/getRibbonText';
import useTypedSelector from '../hooks/useTypedSelector';

import Loader from './Loader';
import Message from './Message';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';
import ProductCard from './ProductCard';
import WishType from '../models/WishType';

const WishList: React.FC<{ isCarousel?: boolean }> = ({ isCarousel = false }) => {
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState(defaultEndpoint['wishList']);

  const {
    wishList,
    loading: loadingWishList,
    error: errorWishList
  } = useTypedSelector((state) => state.wishListItems);

  const { success: successDeleteWish } = useTypedSelector((state) => state.wishListDelete);

  const { success: successAddWish } = useTypedSelector((state) => state.wishListAdd);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listWishedItems(`${page}${pageSize}${sort}${search}`));
  }, [dispatch, successDeleteWish, successAddWish, endpoint]);

  return (
    <div className={`wish_list ${isCarousel ? 'horizontal' : ''}`}>
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
      ) : wishList?.length === 0 ? (
        <h2>Your Wish List Is Empty</h2>
      ) : (
        <ul className="wish_list_items">
          {wishList?.map((wish: WishType) => (
            <li key={wish.productId}>
              <ProductCard
                product={wish}
                ribbonText={getRibbonText(wish.productId)}
                isWishList={true}
              />
            </li>
          ))}
        </ul>
      )}
      {!isCarousel && (
        <div className="footer">
          <Pagination
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
            pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
            totalItems={wishList?.[0]?.totalDBItems}
          />
        </div>
      )}
    </div>
  );
};

export default WishList;
