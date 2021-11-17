import React, { useEffect } from 'react';
import Accordion from './Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import Loader from './Loader';
import Message from './Message';
import { getDate, numberDecimalFix } from '../constants/utility-functions/utility-functions';
import './styles/OrdersMy.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from './Button';

const OrdersMy = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}?qty=1`);
  };

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch, userInfo]);

  return (
    <div className="my_orders">
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
                          <Button
                            onClick={() => addToCartHandler(item.id)}
                            classes="small"
                            className="order_item_btn"
                          >
                            Add to cart
                          </Button>
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
    </div>
  );
};

export default OrdersMy;
