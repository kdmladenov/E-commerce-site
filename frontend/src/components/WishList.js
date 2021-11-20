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
import { numberDecimalFix } from '../constants/utility-functions/utility-functions';
import  Popover  from './Popover';
import RatingWidget from './RatingWidget';

const WishList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading: loadingWishList, wishList, error: errorWishList } = wishListItems;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDeleteWish } = wishListDelete;

  const deleteWishHandler = (id) => {
    dispatch(deleteWishFromList(id));
  };

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}?qty=1`);
  };

  console.log(wishList, 'wishList');
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
    <div className="wish_list_items">
      {wishList?.map((wish) => (
        <div className="wish_list_item card" key={wish.wishListId}>
          <Link to={`/products/${wish.productId}`}>
            <img
              src={wish.image?.startsWith('http') ? wish.image : `${BASE_URL}/${wish.image}`}
              alt="wish"
              className="wish_image"
            />
          </Link>
          <div className="wish_title">
            <Link to={`/products/${wish.productId}`}>{wish.title}</Link>
          </div>
          <div className="wish_price">
            <strong>$ {numberDecimalFix(wish.price)}</strong>
          </div>
            {wish.reviewCount > 0 ? (
              <Popover
                header={
                  <div className="wish_rating">
                    <Rating rating={wish.rating}></Rating>
                  </div>
                }
              >
                {
                  <RatingWidget
                    productRating={wish.rating}
                    reviewCount={wish.reviewCount}
                    ratingMap={{
                      1: wish.starOne || 0,
                      2: wish.starTwo || 0,
                      3: wish.starThree || 0,
                      4: wish.starFour || 0,
                      5: wish.starFive || 0
                    }}
                    productId={wish.productId}
                  />
                }
              </Popover>
            ) : (
              <div className="wish_rating">
                <Rating rating={wish.rating} />
              </div>
            )}
      
          <div className="wish_button">
            <Button onClick={() => deleteWishHandler(wish.wishListId)} classes={'white card'}>
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
