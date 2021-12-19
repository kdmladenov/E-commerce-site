import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteWishFromList } from '../actions/wishListActions';
import { BASE_URL } from '../constants/constants';
import Button from './Button';
import Popover from './Popover';
import Rating from './Rating';
import RatingWidget from './RatingWidget';
import './styles/WishListCard.css';
import Tooltip from './Tooltip';
import { addToCart } from '../actions/cartActions';
import Price from './Price';

const WishListCard = ({ wish }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading: loadingProduct, error: errorProduct } = productDetails;

  const portalRefs = useSelector((state) => state.portalRefs);
  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = portalRefs;

  const addToCartHandler = (id, title, image, price) => {
    dispatch(addToCart(id, 1));
    toastCartRef.current.createToast({ title, image, price, qty: 1 });
  };

  return (
    <li className="wish_list_item card" key={wish.wishListId}>
      <Link className="wish_image" to={`/products/${wish.productId}`}>
        <img
          src={wish.image?.startsWith('http') ? wish.image : `${BASE_URL}/${wish.image}`}
          alt="wish"
        />
      </Link>
      <div className="wish_title">
        <Link to={`/products/${wish.productId}`}>{wish.title}</Link>
      </div>
      <div className="wish_price flex">
        <Price price={wish.price} />
      </div>
      {wish.reviewCount > 0 ? (
        <Popover
          header={
            <div className="wish_rating">
              <Rating rating={wish.rating}></Rating>
            </div>
          }
        >
          {product && <RatingWidget product={product} />}
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
          onClick={() => addToCartHandler(wish.productId, wish.title, wish.image, wish.price)}
          classes={'white rounded'}
        >
          Add To Cart
        </Button>
      </div>
    </li>
  );
};

export default WishListCard;
