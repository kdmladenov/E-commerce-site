import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/WishListBtn.css';
import { addWishToList, deleteWishFromList } from '../state/actions/wishListActions';

import Button from './Button';
import Tooltip from './Tooltip';

const WishListBtn = ({ productId, isHeartIcon = true }) => {
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
        <Tooltip text={isHeartIcon ? (isInWishList ? 'Added' : 'Add') : 'Remove'}>
          {<i className={`fa ${isHeartIcon ? 'fa-heart' : 'fa-times'}`} />}
        </Tooltip>
      </Button>
    </div>
  );
};

export default WishListBtn;
