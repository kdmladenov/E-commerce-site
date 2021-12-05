import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { BASE_URL } from '../constants/constants';
import './styles/OrderScreen.css';
import axios from 'axios';
import {
  ORDER_CREATE_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from '../constants/orderConstants';
import { numberDecimalFix } from '../constants/utility-functions';
import Button from '../components/Button';

const OrderScreen = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET });
  }, []);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`${BASE_URL}/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      // if there is no order or it is paid
      dispatch({ type: ORDER_PAY_RESET }); // prevents infinite loop
      dispatch({ type: ORDER_DELIVER_RESET }); // prevents infinite loop
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <main className="order">
      <h1>Order: {orderId}</h1>
      <div className="flex">
        <dir className="col-8">
          <ul>
            <li>
              <h1>Shipping</h1>
              <p>
                <strong>Name:</strong> {order?.fullName}
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${order?.email}`}>{order?.email}</a>
              </p>

              <p>
                <strong>Address:</strong>
                {order?.shippingAddress} {order?.shippingAddress2}, {order?.shippingCity},{' '}
                {order?.shippingZip}, {order?.shippingState}, {order?.shippingCountry}
              </p>
              {order?.isDelivered ? (
                <Message type="success">Delivered at {order?.deliveryDate.slice(0, 10)}</Message>
              ) : (
                <Message type="error">Not Delivered</Message>
              )}
            </li>
            <li>
              <h1>Payment Method</h1>
              <p>
                <strong>Method:</strong> {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message type="success">Paid at {order?.paymentDate.slice(0, 10)}</Message>
              ) : (
                <Message type="error">Not Paid</Message>
              )}
            </li>
            <li>
              <h1>Order Items</h1>
              {order?.orderItemsCreated?.length === 0 ? (
                <Message type="error">Order is empty</Message>
              ) : (
                <ul>
                  {order?.orderItemsCreated?.map((item) => (
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
                  <dir>$ {numberDecimalFix(order?.itemsPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Shipping</div>
                  <dir>$ {numberDecimalFix(order?.shippingPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Tax</div>
                  <dir>$ {numberDecimalFix(order?.taxPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Total</div>
                  <dir>$ {numberDecimalFix(order?.totalPrice)}</dir>
                </div>
              </li>
            </ul>
            {!order?.isPaid && (
              <li>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler} />
                )}
              </li>
            )}
            {userInfo.role === 'admin' && order.isPaid && !order.isDelivered && (
              <div className="deliver_btn">
                <Button onClick={deliverHandler} classes="large">
                  Mark as Delivered
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderScreen;
