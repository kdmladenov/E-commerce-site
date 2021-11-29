import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import './styles/CartScreen.css';
import { MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';
import { numberDecimalFix } from '../constants/utility-functions';
import Tooltip from '../components/Tooltip';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  return (
    <div className="cart_container container">
      <div className="cart_items">
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back to Home Screen</Link>
          </Message>
        ) : (
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id}>
                <div className="cart_item">
                  <div className="cart_item_image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart_item_description">
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </div>
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.id, +e.target.value))}
                  >
                    {[...Array(item.stockCount).keys()]
                      .slice(0, Math.min(item.stockCount, MAX_PRODUCT_QTY_FOR_PURCHASE))
                      .map((index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                  </select>
                  <div
                    className="cart_item_delete_btn"
                    onClick={() => removeFromCartHandler(item.id)}
                  >
                    <Tooltip text="Remove">
                      <i className="fas fa-trash"></i>
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cart_action_box">
        <div className="card">
          <ul>
            <li>
              <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
              <h3>
                ${' '}
                {numberDecimalFix(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))}
              </h3>
            </li>
            <li>
              <button className="btn" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                {cartItems.length === 0 ? 'Cart is empty' : 'Proceed to checkout'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
