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
import { adminUserListPageSizeSelect, adminUserListSortSelect } from '../constants/inputMaps';
import Pagination from './Pagination';
import SearchBox from './SearchBox';

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=user_id asc&',
    search: ''
  });

  console.log(endpoint, 'endpoint');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  useEffect(() => {
    // only admins to have access to the url
    if (userInfo?.role === 'admin') {
      const { page, pageSize, sort, search } = endpoint;

      dispatch(listUsers(`${page}${pageSize}${sort}${search}`));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, deleteSuccess, endpoint]);

  // // TO DO implement restore user
  // const deleteUserHandler = (userId) => {
  //   window.confirm('Are your sure you want to delete this user?');
  //   dispatch(deleteUser(userId));
  // };

  return (
    <div className="user_list_container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : users?.length > 0 ? (
        <Accordion className="user_list">
          <div className="header">
            <SearchBox updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })} />
            <div className="dropdown_group_container">
              <select
                name="pageSize"
                onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
              >
                <option value="">{`Page size: ${
                  adminUserListPageSizeSelect.find((item) => item.value === endpoint.pageSize).label
                }`}</option>
                {adminUserListPageSizeSelect
                  .filter((size) => size.value !== endpoint.pageSize)
                  .map((size) => (
                    <option key={size.label} value={size.value}>
                      {size.label}
                    </option>
                  ))}
              </select>
              <select
                name="sort"
                onChange={(e) => setEndpoint({ ...endpoint, [e.target.name]: e.target.value })}
              >
                <option value="">{`Sort by: ${
                  adminUserListSortSelect.find((item) => item.value === endpoint.sort).label
                }`}</option>
                {adminUserListSortSelect
                  .filter((item) => item.value !== endpoint.sort)
                  .map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>
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
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <h2>There are no users to show</h2>
      )}
      <div className="footer">
        {users?.length > 0 && (
          <Pagination
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
            pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
            totalItems={users[0].totalDBItems}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
