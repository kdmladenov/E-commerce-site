import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import Message from '../components/Message';
import { numberDecimalFix } from '../constants/constants';
import './styles/OrderScreen.css';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  console.log(order);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <dir className="container">
      <h1>Order: {orderId}</h1>
      <div className="flex">
        <dir className="col-8">
          <ul>
            <li>
              <h1>Shipping</h1>
              <p>
                <strong>Name:</strong> {order.fullName}
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${order.email}`}>{order.email}</a>
              </p>

              <p>
                <strong>Address:</strong>
                {order?.shippingAddress} {order?.shippingAddress2}, {order?.shippingCity},{' '}
                {order?.shippingZip}, {order?.shippingState}, {order?.shippingCountry}
              </p>
              {order.isDelivered ? (
                <Message variant="success">{order.deliveryDate.slice(0, 10)}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </li>
            <li>
              <h1>Payment Method</h1>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">{order.paymentDate.slice(0, 10)}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </li>
            <li>
              <h1>Order Items</h1>
              {order.orderItemsCreated?.length === 0 ? (
                <Message variant="danger">Order is empty</Message>
              ) : (
                <ul>
                  {order.orderItemsCreated?.map((item) => (
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
                  <dir>$ {numberDecimalFix(order.itemsPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Shipping</div>
                  <dir>$ {numberDecimalFix(order.shippingPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Tax</div>
                  <dir>$ {numberDecimalFix(order.taxPrice)}</dir>
                </div>
              </li>
              <li>
                <div className="flex item-card">
                  <div>Total</div>
                  <dir>$ {numberDecimalFix(order.totalPrice)}</dir>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </dir>
  );
};

export default OrderScreen;
