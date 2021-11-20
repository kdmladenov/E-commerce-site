import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishFromList, listWishedItems } from '../actions/wishListActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import './styles/WishListScreen.css';
import Button from '../components/Button';

const WishListScreen = () => {
  const dispatch = useDispatch();

  const wishListItems = useSelector((state) => state.wishListItems);
  const { loading, wishList, error } = wishListItems;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDelete } = wishListDelete;

  useEffect(() => {
    dispatch(listWishedItems());
  }, [dispatch, successDelete]);

  const listToShow = wishList?.map((wish) => (
    <li className="product" key={wish.wishListId}>
      <ProductCard
        id={wish.productId}
        title={wish.title}
        image={wish.image}
        price={wish.price}
        rating={wish.rating}
        stockCount={wish.stockCount}
        reviewCount={wish.reviewCount}
        ratingMap={{
          1: wish.starOne || 0,
          2: wish.starTwo || 0,
          3: wish.starThree || 0,
          4: wish.starFour || 0,
          5: wish.starFive || 0
        }}
      />
      <Button onClick={() => dispatch(deleteWishFromList(wish.wishListId))}>Delete</Button>
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
