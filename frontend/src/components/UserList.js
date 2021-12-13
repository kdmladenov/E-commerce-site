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
import { adminListPageSizeOptionsMap, adminUserListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=10&',
    sort: 'sort=user_id asc&',
    search: ''
  });

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
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="users"
        pageSizeOptionsMap={adminListPageSizeOptionsMap}
        sortOptionsMap={adminUserListSortOptionsMap}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : users?.length > 0 ? (
        <Accordion className="user_list">
          {users?.map((user) => (
            <Accordion.Item key={user.userId}>
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
