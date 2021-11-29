import React, { useEffect } from 'react';
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

const WishList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading: loadingWishList, wishList, error: errorWishList } = wishListItems;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDeleteWish } = wishListDelete;

  const wishListCardsToShow = wishList?.map((wish) => <WishListCard wish={wish} />);

  useEffect(() => {
    dispatch(listWishedItems());
  }, [dispatch, successDeleteWish]);

  return loadingWishList ? (
    <Loader />
  ) : errorWishList ? (
    <Message type="error">{errorWishList}</Message>
  ) : wishList.length === 0 ? (
    <h2>Your Wish List Is Empty</h2>
  ) : (
    <ul className="wish_list_items">{wishListCardsToShow}</ul>
  );
};

export default WishList;
