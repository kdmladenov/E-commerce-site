import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import './styles/CartScreen.css';
import { MAX_PRODUCT_QTY_FOR_PURCHASE, numberDecimalFix } from '../constants/constants';

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
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  return (
    <div className="flex text-center">
      <div className="col-8">
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back to Home Screen</Link>
          </Message>
        ) : (
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id}>
                <div className="flex cart-item ">
                  <div className="col-2 mx-4 p-auto">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="col-3 p-auto text text-center">
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </div>
                  <select
                    className="mx-4"
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
                    className="col-2 btn-outline m-auto"
                    onClick={() => removeFromCartHandler(item.id)}
                  >
                    <i className="fas fa-trash"></i>{' '}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-4">
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
