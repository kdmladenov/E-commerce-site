import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import { Link } from 'react-router-dom';
import './styles/OrderListAdmin.css';
import { listOrders } from '../actions/orderActions';
import Accordion from './Accordion';
import { getDate } from '../constants/utility-functions';
import { adminListPageSizeOptionsMap, adminOrderListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import Price from './Price';
import HeaderControls from './HeaderControls';
import { DAYS_FOR_DELIVERY } from '../constants/constants';

const OrderListAdmin = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_id desc&',
    search: ''
  });

  useEffect(() => {
    if (userInfo?.role === 'admin') {
      const { page, pageSize, sort, search } = endpoint;

      dispatch(listOrders(`${page}${pageSize}${sort}${search}`));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, endpoint]);

  return (
    <div className="order_list_admin">
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="orders"
        pageSizeOptionsMap={adminListPageSizeOptionsMap}
        sortOptionsMap={adminOrderListSortOptionsMap}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : orders?.length > 0 ? (
        <>
          <div className="order_title_header">
            <div>
              <span>Order date</span>
            </div>
            <div>
              <span>Total</span>
            </div>
            <div>
              <span>Ship to</span>
            </div>
            <div>
              <span>Payment status</span>
            </div>
            <div>
              <span>Delivery status</span>
            </div>
          </div>
          <Accordion>
            {orders?.map((order) => (
              <Accordion.Item key={order.orderId}>
                <Accordion.Header>
                  <Accordion.Title>
                    <div className="order_title">
                      <div>
                        <span>{getDate(order.orderDate)}</span>
                      </div>
                      <div>
                        <Price price={order.totalPrice} color="black" size="small" />
                      </div>
                      <div>
                        <span>{`${order.shippingAddress} ${
                          order.shippingAddress2 !== null ? order.shippingAddress2 : ''
                        }, ${order.shippingCity}, ${order.shippingState}, ${
                          order.shippingCountry
                        }`}</span>
                      </div>
                      <div>
                        <span className={order.isDelivered ? 'completed' : 'not_started'}>
                          {order.isPaid ? ` Paid (${getDate(order.paymentDate)})` : 'Not paid'}
                        </span>
                      </div>
                      <div>
                        <span
                          className={
                            order.isDelivered
                              ? 'completed'
                              : order.isPaid
                              ? 'in_progress'
                              : 'not_started'
                          }
                        >
                          {order.isDelivered
                            ? ` Delivered (${getDate(order.deliveryDate)})`
                            : order.isPaid
                            ? `Shipped (exp. ${getDate(order.paymentDate, DAYS_FOR_DELIVERY)})`
                            : 'Not shipped'}
                        </span>
                      </div>
                    </div>
                  </Accordion.Title>
                  <Accordion.ButtonGroup>
                    <div className="button_group">
                      <span>
                        ORDER # <strong>{`${order.orderId}`}</strong>
                      </span>
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
                        <li key={item.orderItemId}>
                          <div className="order_item">
                            <div className="image">
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div className="title">
                              <Link to={`/products/${item.productId}`}>{item.title}</Link>
                            </div>
                            <div className="total">
                              <Price price={item.price} size="small" />
                              <span>{` x ${item.qty}`}</span>
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
        </>
      ) : (
        <h2>You have no orders</h2>
      )}
      <div className="footer">
        {orders?.length > 0 && (
          <Pagination
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
            pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
            totalItems={orders[0].totalDBItems}
          />
        )}
      </div>
    </div>
  );
};

export default OrderListAdmin;