import React from 'react';
import { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/CartScreen.css';
import { addToCart, removeFromCart, updateCartItemQty } from '../state/actions/cartActions';
import { listBrowsingHistory } from '../state/actions/browsingHistoryActions';
import { MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';

import Message from '../components/Message';
import Rating from '../components/Rating';
import Price from '../components/Price';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import WishList from '../components/WishList';
import WishListBtn from '../components/WishListBtn';
import useTypedSelector from '../hooks/useTypedSelector';

const CartScreen: React.FC<RouteComponentProps<{ productId: string }>> = ({
  match,
  location,
  history
}) => {
  const dispatch = useDispatch();

  const { productId } = match.params;
  const qty = location.search ? +location.search.split('=')[1] : 1;

  const { cartItems } = useTypedSelector((state) => state.cart);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { browsingHistory } = useTypedSelector((state) => state.browsingHistoryList);

  const removeFromCartHandler = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = useTypedSelector((state) => state.portalRefs);

  const addToCartHandler = (productId: number, title: string, image: string, price: number) => {
    dispatch(addToCart(productId, 1));
    toastCartRef.current.createToast({ title, image, price, qty: 1 });
  };

  const recentItemsToShow = (
    <ul>
      {browsingHistory?.slice(0, Math.min(cartItems?.length, 5)).map((item) => (
        <li key={item.productId}>
          <div className="recent_item">
            <Link className="image" to={`/products/${item.productId}`}>
              <img src={item.image} alt={item.title} />
            </Link>
            <div className="content">
              <Link className="title" to={`/products/${item.productId}`}>
                {item.title}
              </Link>
              <Price price={item.price} size="small" />
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
      dispatch(addToCart(+productId, qty));
    }
  }, [dispatch, cartItems, productId, qty]);

  useEffect(() => {
    dispatch(listBrowsingHistory());
  }, [dispatch]);

  return (
    <main className="cart_screen">
      <div className="cart_container">
        <div className="cart_items card">
          <div className="header">
            <h1>Shopping Cart</h1>
            <h4>Price</h4>
          </div>
          {cartItems?.length > 0 ? (
            <ul>
              {cartItems?.map((item) => (
                <li key={item.productId}>
                  <div className="cart_item">
                    <Link className="image" to={`/products/${item.productId}`}>
                      <img src={item.image} alt={item.title} />
                    </Link>
                    <div className="content">
                      <Link className="title" to={`/products/${item.productId}`}>
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
                        <select
                          onChange={(e) => dispatch(updateCartItemQty(item, +e.target.value))}
                        >
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
                          onClick={() => removeFromCartHandler(item.productId)}
                          classes=" delete_btn text"
                        >
                          Delete
                        </Button>
                        <WishListBtn productId={item.productId} />
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
        <aside className="sidebar">
          <div className="sidebar_group">
            <div className="cart_action_box card">
              <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items:</h3>
              <Price price={cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)} />
              <Button classes="rounded" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                {cartItems.length === 0 ? 'Cart is empty' : 'Proceed to checkout'}
              </Button>
            </div>
            {userInfo?.token && (
              <div className="recent_items card">
                <h3>Your recently viewed items</h3>
                {recentItemsToShow}
                <Button classes="text" onClick={() => history.push('/history')}>
                  Your Full Browsing History
                </Button>
              </div>
            )}
          </div>
        </aside>
        {userInfo?.token && (
          <Carousel title={'Your Wish List'}>
            <WishList isCarousel={true} />
          </Carousel>
        )}
      </div>
    </main>
  );
};

export default CartScreen;
