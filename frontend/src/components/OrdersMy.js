import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import Loader from './Loader';
import Message from './Message';
import { getDate } from '../constants/utility-functions';
import './styles/OrdersMy.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from './Button';
import Price from './Price';
import { adminListPageSizeOptionsMap, adminOrderListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';
import { DAYS_FOR_DELIVERY } from '../constants/constants';

const OrdersMy = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_id desc&',
    search: ''
  });

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}?qty=1`);
  };

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listMyOrders(`${page}${pageSize}${sort}${search}`));
  }, [dispatch, userInfo, endpoint]);

  return (
    <div className="my_orders">
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
      ) : (
        <div className="orders_container">
          {orders?.length > 0 ? (
            <>
              <div className="order_title_header">
                <div>
                  <span>ID</span>
                </div>
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
                            <strong>{order.orderId}</strong>
                          </div>
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
                          <Button
                            classes="white rounded"
                            onClick={() => history.push(`/order/${order.orderId}`)}
                          >
                            Details
                          </Button>
                        </div>
                        {/* <div className="button_group">
                      <span>
                        ORDER # <strong>{`${order.orderId}`}</strong>
                      </span>
                      <Link to={`/order/${order.orderId}`}>
                        <Button classes="text">View order details</Button>
                      </Link>
                    </div> */}
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
                                  <Link to={`/products/${item.orderItemId}`}>{item.title}</Link>
                                </div>
                                <div className="total">
                                  <Price price={item.price} size="small" />
                                  <span>{` x ${item.qty}`}</span>
                                </div>
                                <Button
                                  onClick={() => addToCartHandler(item.orderItemId)}
                                  classes="rounded small"
                                  className="order_item_btn"
                                  disabled={item.stockCount === 0}
                                >
                                  {item.stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
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
            </>
          ) : (
            <h2>You have no orders</h2>
          )}
        </div>
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

export default OrdersMy;
