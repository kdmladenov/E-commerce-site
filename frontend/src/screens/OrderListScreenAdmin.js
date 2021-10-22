import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './styles/UserListScreenAdmin.css';
import { listOrders } from '../actions/orderActions';

const OrderListScreenAdmin = ({ history }) => {
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
    <main className="order_list container">
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.fullName}</td>
                <td>{order.orderDate.slice(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <td>{order.paymentDate.slice(0, 10)}</td>
                  ) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <td>{order.deliveryDate.slice(0, 10)}</td>
                  ) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order.orderId}`}>
                    <Button>Details</Button>
                  </Link>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default OrderListScreenAdmin;
