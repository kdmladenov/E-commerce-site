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

const OrdersMy = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=order_date desc&',
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
                            <Price price={item.price} size="small" />
                            <span>{` x ${item.qty}`}</span>
                          </div>
                          <Button
                            onClick={() => addToCartHandler(item.id)}
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

export default OrdersMy;
