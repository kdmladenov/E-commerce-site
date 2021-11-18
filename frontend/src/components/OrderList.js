import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './styles/OrderList.css';
import { listOrders } from '../actions/orderActions';
import  Accordion  from './Accordion';
import { getDate, numberDecimalFix } from '../constants/utility-functions/utility-functions';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo?.role === 'admin') {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <main className="order_list">
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : orders?.length > 0 ? (
        <Accordion>
          {orders?.map((order) => (
            <Accordion.Item id={order.orderId}>
              <Accordion.Header>
                <Accordion.Title>
                  <div className="order_title">
                    <div>
                      <span>ORDER DATE</span>
                      <span>{getDate(order.orderDate)}</span>
                    </div>
                    <div>
                      <span>TOTAL</span>
                      <span>$ {order.totalPrice}</span>
                    </div>
                    <div>
                      <span>SHIP TO</span>
                      <span>{`${order.shippingAddress} ${
                        order.shippingAddress2 !== null ? order.shippingAddress2 : ''
                      }, ${order.shippingCity}, ${order.shippingState}, ${
                        order.shippingCountry
                      }`}</span>
                    </div>
                  </div>
                </Accordion.Title>
                <Accordion.ButtonGroup>
                  <div className="button_group">
                    <span>{`ORDER # ${order.orderId}`}</span>
                    <Link to={`/order/${order.orderId}`}>
                      <Button classes="text">View order details</Button>
                    </Link>
                  </div>
                </Accordion.ButtonGroup>
              </Accordion.Header>
              <Accordion.Body>
                {order?.orderItems?.length === 0 ? (
                  <Message type="error">Order is empty</Message>
                ) : (
                  <ul>
                    {order?.orderItems?.map((item) => (
                      <li key={item.id}>
                        <div className="order_item">
                          <div className="image">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="title">
                            <Link to={`/products/${item.id}`}>{item.title}</Link>
                          </div>
                          <div className="total">
                            {`$ ${numberDecimalFix(item.price)} x ${item.qty}`}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <h2>You have no orders</h2>
      )}
    </main>
  );
};

export default OrderList;
