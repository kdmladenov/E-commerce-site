import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWishToList, deleteWishFromList, listWishedItems } from '../actions/wishListActions';
import Button from './Button';
import Tooltip from './Tooltip';
import './styles/WishListBtn.css';

const WishListBtn = ({ productId }) => {
  const dispatch = useDispatch();

  const wishListItems = useSelector((state) => state.wishListItems);
  const { wishList } = wishListItems;

  const wishListAdd = useSelector((state) => state.wishListAdd);
  const { success: successAddWish } = wishListAdd;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDeleteWish } = wishListDelete;

  const wishlistHandler = () => {
    wishList.some((wish) => wish.productId === productId)
      ? dispatch(
          deleteWishFromList(wishList.find((wish) => wish.productId === productId).wishListId)
        )
      : dispatch(addWishToList(productId));
  };

  useEffect(() => {
    dispatch(listWishedItems());
  }, [dispatch, successAddWish, successDeleteWish]);

  return (
    <div
      className={`wish_list_btn ${
        wishList?.some((wish) => wish.productId === productId) ? 'active' : ''
      }`}
    >
      <Button onClick={wishlistHandler} classes={'icon'}>
        <Tooltip text="Wish List">{<i className={`fa fa-heart`} />}</Tooltip>
      </Button>
    </div>
  );
};

export default WishListBtn;
