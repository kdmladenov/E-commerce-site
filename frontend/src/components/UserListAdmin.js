import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers, restoreUser } from '../actions/userActions';
import Button from './Button';
import { Link } from 'react-router-dom';
import './styles/UserListAdmin.css';
import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';
import Profile from './Profile';
import { adminListPageSizeOptionsMap, adminUserListSortOptionsMap } from '../constants/inputMaps';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';
import Avatar from './Avatar';

const UserListAdmin = ({ history }) => {
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

  const userRestore = useSelector((state) => state.userRestore);
  const { success: restoreSuccess } = userRestore;

  useEffect(() => {
    // only admins to have access to the url
    if (userInfo?.role === 'admin') {
      const { page, pageSize, sort, search } = endpoint;

      dispatch(listUsers(`${page}${pageSize}${sort}${search}`));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, deleteSuccess, restoreSuccess, endpoint]);

  // // TO DO implement restore user
  const deleteUserHandler = (userId) => {
    window.confirm('Are your sure you want to delete this user?');
    dispatch(deleteUser(userId));
  };

  const restoreUserHandler = (userId) => {
    window.confirm('Are your sure you want to restore this user?');
    dispatch(restoreUser(userId));
  };

  return (
    <div className="user_list_admin">
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
        <>
          <div className="user_title_header">
            <div>
              <span>ID</span>
            </div>
            <div>
              <span>Name</span>
            </div>
            <div>
              <span>Email</span>
            </div>
            <div>
              <span>Active</span>
            </div>
          </div>
          <Accordion className="user_list">
            {users?.map((user) => (
              <Accordion.Item key={user.userId}>
                <Accordion.Header>
                  <Accordion.Title>
                    <div className="user_title">
                      <div>
                        <strong>{user.userId}</strong>
                      </div>
                      <div className="avatar">
                        <Avatar fullName={user.fullName} imageUrl={user.avatar} />
                      </div>
                      <div>
                        <span>{user.email}</span>
                      </div>
                      <div>
                        {!user.isDeleted ? (
                          <i className="fa fa-check" style={{ color: 'green' }}></i>
                        ) : (
                          <i className="fa fa-times" style={{ color: 'red' }}></i>
                        )}
                      </div>
                    </div>
                  </Accordion.Title>
                  <Accordion.ButtonGroup className="button_group">
                    <Button
                      classes="white rounded"
                      className={`tab_button ${activeTab === 'profile' && 'active'}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      Profile
                    </Button>
                    <Button
                      classes="white rounded"
                      className={`tab_button ${activeTab === 'orders' && 'active'}`}
                      onClick={() => setActiveTab('orders')}
                    >
                      Orders
                    </Button>
                    <Button
                      classes="white rounded"
                      disabled={user.userId === userInfo?.userId}
                      onClick={() =>
                        !user.isDeleted
                          ? deleteUserHandler(user.userId)
                          : restoreUserHandler(user.userId)
                      }
                    >
                      {!user.isDeleted ? 'Delete' : 'Restore'}
                    </Button>
                  </Accordion.ButtonGroup>
                </Accordion.Header>
                <Accordion.Body>
                  {activeTab === 'profile' && <Profile user={user} />}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
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

export default UserListAdmin;
