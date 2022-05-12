import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

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
import useTypedSelector from '../hooks/useTypedSelector';

import Button from '../components/Button';
import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import Message from '../components/Message';
import Price from '../components/Price';
import Rating from '../components/Rating';

const PlaceOrderScreen: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const {
    shippingAddress,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    paymentMethod,
    cartItems
  } = useTypedSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice =
    itemsPrice <= FREE_SHIPPING_THRESHOLD
      ? itemsPrice * SHIPPING_PRICE_AS_PERCENT_FROM_ITEMS_PRICE
      : 0;
  const taxPrice = (itemsPrice + shippingPrice) * TAX_RATE;
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const { user } = useTypedSelector((state) => state.userDetails);

  const { order, success, error } = useTypedSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order?.orderId}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        shippingAddress2,
        shippingCity,
        shippingState,
        shippingZip,
        shippingCountry,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice: itemsPrice + shippingPrice + taxPrice
      })
    );
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: CART_REMOVE_ALL_ITEMS });
  };

  const removeFromCartHandler = (productId: number) => {
    dispatch(removeFromCart(productId));
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
                <address>{`${shippingAddress} ${shippingAddress2}`.toUpperCase()}</address>
                <address>{`${shippingCity},${shippingState} ${shippingZip}`.toUpperCase()}</address>
                <address>{`${shippingCountry}`.toUpperCase()}</address>
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
                  <td>{`Items (${cartItemsCount}):`}</td>
                  <td>
                    <Price price={itemsPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Shipping & handling:</td>
                  <td>
                    <Price price={shippingPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Total before tax:</td>
                  <td>
                    <Price price={itemsPrice + shippingPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Estimated tax:</td>
                  <td>
                    <Price price={taxPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Order total:</td>
                  <td>
                    <Price price={itemsPrice + shippingPrice + taxPrice} />
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
                  <li key={item.productId}>
                    <div className="order_item">
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
                            classes="delete_btn text"
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
