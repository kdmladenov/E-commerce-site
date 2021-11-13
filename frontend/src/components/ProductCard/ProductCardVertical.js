import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';
import './styles/ProductCardVertical.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Button';
import { BASE_URL } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addWishToList, deleteWishFromList, listWishedItems } from '../../actions/wishListActions';

const ProductCardVertical = ({ id, title, image, price, rating, stockCount }) => {
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
    <div className="product_card">
      <div className="product_info">
        <div className="product_title">
          <Link to={`/products/${id}`}>{title}</Link>
        </div>
        <div className="product_price">
          <strong>$ {price}</strong>
        </div>
        <div className="product_rating">
          <Rating rating={rating} />
        </div>
      </div>
      <Link to={`/products/${id}`}>
        <img
          src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
          alt="product"
          className="product_image"
        />
      </Link>
      <div className="product_button">
        <Button onClick={addToCartHandler} classes={'rounded medium'} disabled={stockCount === 0}>
          {stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
      <div
        className={`product_wish_list_button ${
          wishList.some((wish) => wish.productId === id) ? 'active' : ''
        }`}
      >
        <Button onClick={wishlistHandler} classes={'icon'}>
          {<i className={`fa fa-heart`} />}
        </Button>
      </div>
    </div>
  );
};

ProductCardVertical.defaultProps = {
  id: 0,
  title: '',
  image: '',
  price: 0,
  rating: 0
};

ProductCardVertical.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number
};

export default ProductCardVertical;
