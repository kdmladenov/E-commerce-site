import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listWishedItems } from '../actions/wishListActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCardVertical from '../components/ProductCard/ProductCardVertical';
import './styles/WishListScreen.css';

const WishListScreen = () => {
  const dispatch = useDispatch();

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading, wishList, error } = wishListItems;

  useEffect(() => {
    dispatch(listWishedItems());
  }, [dispatch]);

const listToShow = wishList?.map((wish) => (
  <li className="product" key={wish.wishListId}>
    <ProductCardVertical
      title={wish.title}
      image={wish.image}
      price={wish.price}
      rating={wish.rating}
      stockCount={wish.stockCount}
    />
  </li>
));

  return (
    <main className="wish_list container">
      <div className="sidebar">sidebar</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="wish_list_container">
          <ul>{listToShow}</ul>
        </div>
      )}
    </main>
  );
};

export default WishListScreen;
