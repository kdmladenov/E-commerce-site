import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWishToList, deleteWishFromList } from '../actions/wishListActions';
import Button from './Button';
import Tooltip from './Tooltip';
import './styles/WishListBtn.css';

const WishListBtn = ({ productId }) => {
  const dispatch = useDispatch();

  const [isInWishList, setIsInWishList] = useState(
    JSON.parse(localStorage.getItem('allMyWishList'))?.some((wish) => wish.productId === productId)
  );

  const wishlistHandler = () => {
    if (isInWishList) {
      dispatch(deleteWishFromList(productId));
      setIsInWishList(false);
    } else {
      dispatch(addWishToList(productId));
      setIsInWishList(true);
    }
  };

  return (
    <div className={`wish_list_btn ${isInWishList ? 'active' : ''}`}>
      <Button onClick={wishlistHandler} classes={'icon'}>
        <Tooltip text="Wish List">{<i className={`fa fa-heart`} />}</Tooltip>
      </Button>
    </div>
  );
};

export default WishListBtn;
