import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import './styles/ProductCard.css';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addWishToList, deleteWishFromList, listWishedItems } from '../actions/wishListActions';
import Price from './Price';
import Ribbon from './Ribbon';
import Popover from './Popover';
import RatingWidget from './RatingWidget';

const ProductCard = ({
  id,
  title,
  image,
  price,
  rating,
  reviewCount,
  stockCount,
  horizontal,
  ribbonText,
  ratingMap
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const wishListItems = useSelector((state) => state.wishListItems);
  const { wishList } = wishListItems;

  const wishListAdd = useSelector((state) => state.wishListAdd);
  const { success: successAdd } = wishListAdd;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDelete } = wishListDelete;

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=1`);
  };

  const wishlistHandler = () => {
    wishList.some((wish) => wish.productId === id)
      ? dispatch(deleteWishFromList(wishList.find((wish) => wish.productId === id).wishListId))
      : dispatch(addWishToList(id));
  };

  useEffect(() => {
    dispatch(listWishedItems());
  }, [dispatch, successDelete, successAdd]);

  return (
    <div className={`product_card ${horizontal ? 'horizontal' : ''}`}>
      <Link to={`/products/${id}`}>
        <img
          src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
          alt="product"
          className="image"
        />
      </Link>
      <div className="title">
        <Link to={`/products/${id}`}>{title}</Link>
      </div>
      {reviewCount > 0 ? (
        <Popover
          header={
            <div className="rating_review">
              <Rating rating={rating}></Rating>
              {reviewCount > 0 ? (
                <span>{`from ${reviewCount} reviews `}</span>
              ) : (
                <span>no reviews yet</span>
              )}
            </div>
          }
        >
          {
            <RatingWidget
              productRating={rating}
              reviewCount={reviewCount}
              ratingMap={ratingMap}
              productId={id}
            />
          }
        </Popover>
      ) : (
        <div className="rating_review">
          <Rating rating={rating} />
          {reviewCount > 0 ? (
            <span>{`from ${reviewCount} reviews `}</span>
          ) : (
            <span>no reviews yet</span>
          )}
        </div>
      )}

      <div className="price">
        <Price price={price} />
      </div>
      <div className="add_to_cart_btn">
        <Button onClick={addToCartHandler} classes={'rounded small'} disabled={stockCount === 0}>
          {stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
      <div
        className={`wish_list_btn ${
          wishList.some((wish) => wish.productId === id) ? 'active' : ''
        }`}
      >
        <Button onClick={wishlistHandler} classes={'icon'}>
          {<i className={`fa fa-heart`} />}
        </Button>
      </div>
      <div className="product_ribbon">{ribbonText && <Ribbon>{ribbonText}</Ribbon>}</div>
    </div>
  );
};

export default ProductCard;
