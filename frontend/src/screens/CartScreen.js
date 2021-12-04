import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartItemQty } from '../actions/cartActions';
import Message from '../components/Message';
import './styles/CartScreen.css';
import { MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';
import Rating from '../components/Rating';
import Price from '../components/Price';
import Button from '../components/Button';
import { addWishToList, deleteWishFromList, listWishedItems } from '../actions/wishListActions';
import Carousel from '../components/Carousel';
import WishListCard from '../components/WishListCard';
import { listBrowsingHistory } from '../actions/browsingHistoryActions';

const RECENT_ITEMS_COUNT = 5;

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishListItems = useSelector((state) => state.wishListItems);
  const { wishList } = wishListItems;

  const wishListAdd = useSelector((state) => state.wishListAdd);
  const { success: successAddWish } = wishListAdd;

  const wishListDelete = useSelector((state) => state.wishListDelete);
  const { success: successDeleteWish } = wishListDelete;

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { browsingHistory } = browsingHistoryList;


  const wishlistHandler = (id) => {
    wishList.some((wish) => wish.productId === id)
      ? dispatch(deleteWishFromList(id))
      : dispatch(addWishToList(id));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  const wishListCardsToShow = (
    <ul>
      {wishList?.map((wish) => (
        <li key={wish.wishListId}>
          <WishListCard wish={wish} />
        </li>
      ))}
    </ul>
  );

  const portalRefs = useSelector((state) => state.portalRefs);
  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = portalRefs;

  const addToCartHandler = (id, title, image, price) => {
    dispatch(addToCart(id, 1));
    toastCartRef.current.createToast({ title, image, price, qty: 1 });
  };

  const recentItemsToShow = (
    <ul>
      {browsingHistory?.slice(0, 5).map((item) => (
        <li key={item.productId}>
          <div className="recent_item">
            <Link className="image" to={`/products/${item.id}`}>
              <img src={item.image} alt={item.title} />
            </Link>
            <div className="content">
              <Link className="title" to={`/products/${item.id}`}>
                {item.title}
              </Link>
              <Price price={item.price} />
              <Button
                onClick={() => addToCartHandler(item.productId, item.title, item.image, item.price)}
                classes={'rounded small'}
                disabled={item.stockCount === 0}
              >
                {item.stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  useEffect(() => {
    dispatch(listWishedItems());
    dispatch(listBrowsingHistory());
  }, [dispatch, successAddWish, successDeleteWish]);

  return (
    <main className="cart_container">
      <div className="cart_items card">
        <div className="header">
          <h1>Shopping Cart</h1>
          <h4>Price</h4>
        </div>
        {cartItems?.length > 0 ? (
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id}>
                <div className="cart_item">
                  <Link className="image" to={`/products/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                  </Link>
                  <div className="content">
                    <Link className="title" to={`/products/${item.id}`}>
                      {item.title}
                    </Link>
                    <div className="rating_review">
                      <Rating rating={item.rating}></Rating>
                      <span>{`(${item.reviewCount})`}</span>
                    </div>
                    <div className="status">
                      <h5 style={{ color: item.stockCount <= 10 ? 'red' : 'green' }}>
                        {item.stockCount === 0
                          ? 'Out of Stock'
                          : item.stockCount <= 10
                          ? `Only ${item.stockCount} left in stock - order soon.`
                          : 'In Stock'}
                      </h5>
                    </div>
                    <div className="control_group">
                      <select onChange={(e) => dispatch(updateCartItemQty(item, +e.target.value))}>
                        <option value="">{`Qty: ${item.qty}`}</option>
                        {[...Array(item.stockCount).keys()]
                          .slice(0, Math.min(item.stockCount, MAX_PRODUCT_QTY_FOR_PURCHASE))
                          .map((index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                      </select>
                      <Button
                        className="delete_btn"
                        onClick={() => removeFromCartHandler(item.id)}
                        classes="text"
                      >
                        Delete
                      </Button>
                      <Button classes="text" onClick={() => wishlistHandler(item.id)}>
                        {wishList.some((wish) => wish.productId === item.id)
                          ? 'Remove from Wish List'
                          : 'Add to Wish List'}
                      </Button>
                    </div>
                  </div>
                </div>
                <Price price={item.price} />
              </li>
            ))}
          </ul>
        ) : (
          <Message type="info">
            Your cart is empty <Link to="/">Go Back to Home Screen</Link>
          </Message>
        )}
        {cartItems?.length > 0 && (
          <div className="subtotal">
            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items:</h2>
            <Price price={cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)} />
          </div>
        )}
      </div>
      <div className="sidebar">
        <div className="cart_action_box card">
          <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items:</h3>
          <Price price={cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)} />
          <Button classes="rounded" disabled={cartItems.length === 0} onClick={checkoutHandler}>
            {cartItems.length === 0 ? 'Cart is empty' : 'Proceed to checkout'}
          </Button>
        </div>
        <div className="recent_items card">
          <h3>Your recently viewed items</h3>
          {recentItemsToShow}
          <Button classes='text' onClick={() => history.push('/history')}>Your Full Browsing History</Button>
        </div>
      </div>
      <Carousel title={'Your Wish List'}>{wishListCardsToShow}</Carousel>
    </main>
  );
};

export default CartScreen;
