import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../state/actions/orderActions';
import Loader from './Loader';
import Message from './Message';
import { getDate } from '../constants/utility-functions';
import './styles/OrdersMy.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from './Button';
import Price from './Price';
import {
  adminListPageSizeOptionsMap,
  adminOrderListSortOptionsMap,
  defaultEndpoint
} from '../constants/inputMaps';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';
import { DAYS_FOR_DELIVERY } from '../constants/constants';
import Tooltip from './Tooltip';

const OrdersMy = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [endpoint, setEndpoint] = useState(defaultEndpoint['ordersMy']);

  const { orders, loading, error } = useSelector((state) => state.orderMyList);

  const { userInfo } = useSelector((state) => state.userLogin);

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
                {['ID', 'Date', 'Total', 'Ship to', 'Status', ''].map((column) => (
                  <div key={column}>
                    <span>{column}</span>
                  </div>
                ))}
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
                            <span>{getDate(order.orderDate, 0, false, false)}</span>
                          </div>
                          <div>
                            <Price price={order.totalPrice} size="small" />
                          </div>
                          <div>
                            <span>{`${order.shippingAddress} ${
                              order.shippingAddress2 !== null ? order.shippingAddress2 : ''
                            }, ${order.shippingCity}, ${order.shippingState}, ${
                              order.shippingCountry
                            }`}</span>
                          </div>
                          <div>
                            <Tooltip
                              text={
                                <>
                                  <span>
                                    {order.isPaid
                                      ? ` Paid (${getDate(order.paymentDate)})`
                                      : 'Not paid'}
                                  </span>
                                  <span>
                                    {order.isDelivered
                                      ? ` Delivered (${getDate(order.deliveryDate)})`
                                      : order.isPaid
                                      ? `Shipped (exp. ${getDate(
                                          order.paymentDate,
                                          DAYS_FOR_DELIVERY
                                        )})`
                                      : ''}
                                  </span>
                                </>
                              }
                            >
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
                                  ? 'Delivered'
                                  : order.isPaid
                                  ? 'Shipped'
                                  : 'Not Paid'}
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      </Accordion.Title>
                      <Accordion.ButtonGroup>
                        <Tooltip direction="top" text="Details">
                          <Button
                            classes="white rounded"
                            onClick={() => history.push(`/order/${order.orderId}`)}
                          >
                            <i className="fa fa-share" />
                            <span>Details</span>
                          </Button>
                        </Tooltip>
                      </Accordion.ButtonGroup>
                    </Accordion.Header>
                    <Accordion.Body>
                      {order?.orderItems?.length === 0 ? (
                        <Message type="error">Order is empty</Message>
                      ) : (
                        <ul className="order_items">
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
                                <Button
                                  onClick={() => addToCartHandler(item.productId)}
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
        <Pagination
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
          pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
          totalItems={orders?.[0]?.totalDBItems}
        />
      </div>
    </div>
  );
};

export default OrdersMy;
