import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles/PlaceOrderScreen.css';
import { removeFromCart, updateCartItemQty } from '../state/actions/cartActions';
import { createOrder } from '../state/actions/orderActions';
import { CART_REMOVE_ALL_ITEMS } from '../state/constants/cartConstants';
import {
  FREE_SHIPPING_THRESHOLD,
  MAX_PRODUCT_QTY_FOR_PURCHASE,
  SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE,
  TAX_RATE
} from '../constants/constants';
import { ORDER_CREATE_RESET } from '../state/constants/orderConstants';
import checkoutBreadcrumbsSteps from '../inputs/checkoutBreadcrumbsSteps';

import Button from '../components/Button';
import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import Message from '../components/Message';
import Price from '../components/Price';
import Rating from '../components/Rating';

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

  const { user } = useSelector((state) => state.userDetails);

  const { order, success, error } = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.orderId}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

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
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: CART_REMOVE_ALL_ITEMS });
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <main className="place_order_screen">
      <div className="place_order_container">
        <div className="nav card">
          <BreadcrumbsSteps currentStep="Place Order" steps={checkoutBreadcrumbsSteps} />
        </div>
        <section className="body">
          <div className="order_header card">
            <div className="shipping_address">
              <h3>Shipping Address:</h3>
              <ul>
                <li>{`${user?.fullName}`}</li>
                <address>
                  {`${shippingAddress?.address} ${shippingAddress?.address2}`.toUpperCase()}
                </address>
                <address>
                  {`${shippingAddress?.city},${shippingAddress?.state} ${shippingAddress?.zip}`.toUpperCase()}
                </address>
                <address>{`${shippingAddress?.country}`.toUpperCase()}</address>
                <li>{`Phone: ${user?.phone}`}</li>
                <li>{`Email: ${user?.email}`}</li>
              </ul>
            </div>
            <div className="payment_method">
              <h3>Payment Method</h3>
              {paymentMethod}
            </div>
          </div>
          <aside className="sidebar">
            <div className="action_box card">
              <h2>Order summary:</h2>
              <table>
                <tr>
                  <td>{`Items (${cartItems.reduce((acc, item) => acc + item.qty, 0)}):`}</td>
                  <td>
                    <Price price={cart.itemsPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Shipping & handling:</td>
                  <td>
                    <Price price={cart.shippingPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Total before tax:</td>
                  <td>
                    <Price
                      price={cart.itemsPrice + cart.shippingPrice}
                      size="small"
                      color="black"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Estimated tax:</td>
                  <td>
                    <Price price={cart.taxPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Order total:</td>
                  <td>
                    <Price price={cart.totalPrice} />
                  </td>
                </tr>
              </table>
              <Button
                classes="rounded"
                disabled={cartItems.length === 0}
                onClick={() => placeOrderHandler()}
              >
                {cartItems.length === 0 ? 'Cart is empty' : 'Place order'}
              </Button>
            </div>
          </aside>
          <div className="order_items card">
            {cartItems?.length > 0 ? (
              <ul>
                {cartItems?.map((item) => (
                  <li key={item.id}>
                    <div className="order_item">
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
                            className="delete_btn"
                            onClick={() => removeFromCartHandler(item.id)}
                            classes="text"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <Price price={item.price} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Message type="info">
                Your cart is empty <Link to="/">Go Back to Home Screen</Link>
              </Message>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default PlaceOrderScreen;
