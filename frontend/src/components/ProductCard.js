import React from 'react';
import Rating from './Rating';
import './styles/ProductCard.css';
import { Link } from 'react-router-dom';
import Button from './Button';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Price from './Price';
import Ribbon from './Ribbon';
import Popover from './Popover';
import RatingWidget from './RatingWidget';
import WishListBtn from './WishListBtn';

const ProductCard = ({
  product,
  horizontal,
  ribbonText,
  deleteBtn,
  isCard = true,
  isWishList = false
}) => {
  const dispatch = useDispatch();

  const { productId, title, image, price, rating, reviewCount, stockCount } = product;

  const portalRefs = useSelector((state) => state.portalRefs);
  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = portalRefs;

  const addToCartHandler = () => {
    dispatch(addToCart(productId, 1));
    toastCartRef.current.createToast({ title, image, price, qty: 1 });
  };

  return (
    <div className={`product_card ${horizontal ? 'horizontal' : ''} ${isCard ? 'card' : ''}`}>
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
      <WishListBtn productId={productId} isHeartIcon={!isWishList} />
      <div className="product_ribbon">{ribbonText && <Ribbon>{ribbonText}</Ribbon>}</div>
      {deleteBtn}
    </div>
  );
};

export default ProductCard;
