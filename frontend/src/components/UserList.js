import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import Button from './Button';
import { Link } from 'react-router-dom';
import './styles/UserList.css';
import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';
import Profile from './Profile';

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  useEffect(() => {
    // only admins to have access to the url
    if (userInfo?.role === 'admin') {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, deleteSuccess]);

  // // TO DO implement restore user
  // const deleteUserHandler = (userId) => {
  //   window.confirm('Are your sure you want to delete this user?');
  //   dispatch(deleteUser(userId));
  // };

  return (
    <div className="user_list">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : users?.length > 0 ? (
        <Accordion>
          {users?.map((user) => (
            <Accordion.Item id={user.userId}>
              <Accordion.Header>
                <Accordion.Title>
                  <div className="user_title">
                    <div>
                      <span>{`# ${user.userId}`}</span>
                    </div>
                    <div>
                      <span>{user.fullName}</span>
                    </div>
                    <div>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </Accordion.Title>
                <Accordion.ButtonGroup className="button_group">
                  <Button
                    className={`tab_button ${activeTab === 'profile' && 'active'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Profile
                  </Button>
                  <Button
                    className={`tab_button ${activeTab === 'orders' && 'active'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    Orders
                  </Button>
                </Accordion.ButtonGroup>
              </Accordion.Header>
              <Accordion.Body>
                {activeTab === 'profile' ? (
                  <Profile userId={user.userId} user={user} />
                ) : (
                  <h2>Orders</h2>
                )}
                {/* {user?.orderItems?.length === 0 ? (
                  <Message type="error">Order is empty</Message>
                ) : (
                  <ul>
                    {user?.orderItems?.map((item) => (
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
                )} */}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <h2>There are no users</h2>
      )}
    </div>
  );
};

export default UserList;
