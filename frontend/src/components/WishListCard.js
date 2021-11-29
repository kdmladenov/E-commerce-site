import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteWishFromList } from '../actions/wishListActions';
import { BASE_URL } from '../constants/constants';
import { numberDecimalFix } from '../constants/utility-functions';
import Button from './Button';
import Popover from './Popover';
import Rating from './Rating';
import RatingWidget from './RatingWidget';
import { useHistory } from 'react-router';
import './styles/WishListCard.css';
import Tooltip from './Tooltip';

const WishListCard = ({ wish }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}?qty=1`);
  };

  return (
    <li className="wish_list_item card" key={wish.wishListId}>
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
      <div className="remove_btn">
        <Button classes="icon" onClick={() => dispatch(deleteWishFromList(wish.wishListId))}>
          <Tooltip text="Remove">
            <i className="fa fa-times"></i>
          </Tooltip>
        </Button>
      </div>
      <div className="add_to_cart_btn">
        <Button
          className="add_to_cart_btn"
          onClick={() => history.push(`/cart/${wish.wishListId}?qty=1`)}
          classes={'white card'}
        >
          Add To Cart
        </Button>
      </div>
    </li>
  );
};

export default WishListCard;
