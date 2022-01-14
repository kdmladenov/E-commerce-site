import React, { useEffect, useRef, useState } from 'react';
import Rating from './Rating';
import './styles/ProductCard.css';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addWishToList, deleteWishFromList, listWishedItems } from '../actions/wishListActions';
import { addToCart } from '../actions/cartActions';
import Price from './Price';
import Ribbon from './Ribbon';
import Popover from './Popover';
import RatingWidget from './RatingWidget';
import Tooltip from './Tooltip';

const ProductCard = ({
  product,
  horizontal,
  ribbonText,
}) => {
  const dispatch = useDispatch();

  const { productId, title, image, price, rating, reviewCount, stockCount } = product;

  const wishListItems = useSelector((state) => state.wishListItems);
  const { wishList } = wishListItems;

  const wishListAdd = useSelector((state) => state.wishListAdd);
  const { success: successAddWish } = wishListAdd;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDeleteWish } = wishListDelete;

  const portalRefs = useSelector((state) => state.portalRefs);
  const { portalRefsMap: {toast_cart: toastCartRef }} = portalRefs;

  const addToCartHandler = () => {
    dispatch(addToCart(productId, 1));
    toastCartRef.current.createToast({ title, image, price, qty: 1 });
  };

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
    <div className={`product_card ${horizontal ? 'horizontal' : ''}`}>
      <Link to={`/products/${productId}`}>
        <img
          src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
          alt="product"
          className="image"
        />
      </Link>
      <div className="title">
        <Link to={`/products/${productId}`}>{title}</Link>
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
          {product && <RatingWidget product={product} />}
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
          wishList?.some((wish) => wish.productId === productId) ? 'active' : ''
        }`}
      >
        <Button onClick={wishlistHandler} classes={'icon'}>
          <Tooltip text="Wish List">{<i className={`fa fa-heart`} />}</Tooltip>
        </Button>
      </div>
      <div className="product_ribbon">{ribbonText && <Ribbon>{ribbonText}</Ribbon>}</div>
    </div>
  );
};

export default ProductCard;
