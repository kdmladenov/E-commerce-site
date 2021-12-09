import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './styles/OrderList.css';
import { listOrders } from '../actions/orderActions';
import Accordion from './Accordion';
import { getDate } from '../constants/utility-functions';
import SearchBox from './SearchBox';
import DropdownSelect from './DropdownSelect';
import { adminListPageSizeOptionsMap, adminOrderListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import Price from './Price';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_date desc&',
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
    <div className="order_list_container">
      <h1>Orders</h1>
      <div className="header">
        <SearchBox
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          resource="orders"
        />
        <div className="dropdown_group_container">
          <DropdownSelect
            name="pageSize"
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            labelStart="Page size"
            optionsMap={adminListPageSizeOptionsMap}
          />
          <DropdownSelect
            name="sort"
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            labelStart="Sort by"
            optionsMap={adminOrderListSortOptionsMap}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : orders?.length > 0 ? (
        <Accordion>
          {orders?.map((order) => (
            <Accordion.Item key={order.orderId}>
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
                            <Price price={item.price} size="small" color="black" />
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

export default OrderList;
