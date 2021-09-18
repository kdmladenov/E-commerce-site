import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { CART_REMOVE_ALL_ITEMS } from '../constants/cartConstants';
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE,
  TAX_RATE
} from '../constants/constants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { numberDecimalFix } from '../constants/utility-functions.js/utility-functions';
import './styles/PlaceOrderScreen.css';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress,
    paymentMethod: { paymentMethod },
    cartItems
  } = cart;

  cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.shippingPrice =
    cart.itemsPrice >= FREE_SHIPPING_THRESHOLD
      ? 0
      : cart.itemsPrice * SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE;
  cart.taxPrice = (cart.itemsPrice + cart.shippingPrice) * TAX_RATE;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.orderId}`);
    }
    // eslint-disable-next-line
  },[history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    );
    dispatch({type: ORDER_CREATE_RESET})
    dispatch({ type: CART_REMOVE_ALL_ITEMS });
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex">
        <dir className="col-8">
          <ul>
            <li>
              <h1>Shipping</h1>
              <p>
                <strong>Address:</strong>
                {shippingAddress?.address} {shippingAddress?.address2}, {shippingAddress?.city},{' '}
                {shippingAddress?.zip}, {shippingAddress?.state}, {shippingAddress?.country}
              </p>
            </li>
            <li>
              <h1>Payment Method</h1>
              {paymentMethod}
            </li>
            <li>
              <h1>Order Items</h1>
              {cartItems?.length === 0 ? (
                <Message variant="danger">Your cart is empty</Message>
              ) : (
                <ul>
                  {cartItems?.map((item) => (
                    <li key={item.id}>
                      <div className="flex order-item">
                        <div className="col-1 mx-4 p-auto">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="col-7 p-auto text text-center">
                          <Link to={`/products/${item.id}`}>{item.title}</Link>
                        </div>
                        <div className="col-4 p-auto text text-center">
                          {item.qty} x ${numberDecimalFix(item.price)} = $
                          {numberDecimalFix(item.qty * item.price)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </dir>
        <div className="col-4">
          <div className="card">
            <ul>
              <li>
                <h1>Order summary:</h1>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Items</div>
                  <dir>$ {numberDecimalFix(cart.itemsPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Shipping</div>
                  <dir>$ {numberDecimalFix(cart.shippingPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Tax</div>
                  <dir>$ {numberDecimalFix(cart.taxPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Total</div>
                  <dir>$ {numberDecimalFix(cart.totalPrice)}</dir>
                </div>
              </li>
              <li>
                {error && <Message variant='danger'>{error}</Message>}
              </li>
              <li>
                <div className="flex">
                  <button
                    type="button"
                    disabled={cartItems.length === 0}
                    className="btn btn-primary"
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
