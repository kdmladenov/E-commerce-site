import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './styles/OrderListAdmin.css';
import { listOrders } from '../state/actions/orderActions';
import { DAYS_FOR_DELIVERY } from '../constants/constants';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { adminListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { adminOrderListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import getDate from '../helpers/getDate';

import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import Pagination from './Pagination';
import Price from './Price';
import HeaderControls from './HeaderControls';
import Tooltip from './Tooltip';
import OrderType from '../models/OrderType';
import useTypedSelector from '../hooks/useTypedSelector';

const OrderListAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, orders } = useTypedSelector((state) => state.orderList);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const [endpoint, setEndpoint] = useState(defaultEndpoint['orderListAdmin']);

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
            {['ID', 'Date', 'Total', 'Ship to', 'Status', ''].map((column) => (
              <div key={column}>
                <span>{column}</span>
              </div>
            ))}
          </div>
          <Accordion>
            {orders?.map((order: OrderType) => (
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
                        <span>{`${order.address} ${
                          order.address2 !== null ? order.address2 : ''
                        }, ${order.city}, ${order.state} ${order.zip}, ${order.country}`}</span>
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

export default OrderListAdmin;
