import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers, restoreUser } from '../state/actions/userActions';
import Button from './Button';
import './styles/UserListAdmin.css';
import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';
import Profile from './Profile';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';
import Avatar from './Avatar';
import Tooltip from './Tooltip';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { adminListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { adminUserListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';

const UserListAdmin = ({ history }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const [endpoint, setEndpoint] = useState(defaultEndpoint['userListAdmin']);

  const { users, loading, error } = useSelector((state) => state.userList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: deleteSuccess } = useSelector((state) => state.userDelete);

  const { success: restoreSuccess } = useSelector((state) => state.userRestore);

  const { success: successUpdateAvatar } = useSelector((state) => state.userAvatarUpdate);

  const { success: successDeleteAvatar } = useSelector((state) => state.userAvatarDelete);

  useEffect(() => {
    // only admins to have access to the url
    if (userInfo?.role === 'admin') {
      const { page, pageSize, sort, search } = endpoint;

      dispatch(listUsers(`${page}${pageSize}${sort}${search}`));
    } else {
      history.push('/login');
    }
  }, [
    dispatch,
    history,
    userInfo,
    deleteSuccess,
    restoreSuccess,
    successUpdateAvatar,
    successDeleteAvatar,
    endpoint
  ]);

  // // TO DO implement restore user
  const deleteUserHandler = (userId) => {
    // window.confirm('Are your sure you want to delete this user?');
    dispatch(deleteUser(userId));
  };

  const restoreUserHandler = (userId) => {
    // window.confirm('Are your sure you want to restore this user?');
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
            {['ID', 'User', 'Email', 'Active', ''].map((column) => (
              <div key={column}>
                <span>{column}</span>
              </div>
            ))}
          </div>
          <Accordion>
            {users?.map((user) => (
              <Accordion.Item key={user.userId}>
                <Accordion.Header>
                  <Accordion.Title>
                    <div className="user_title">
                      <strong>{user.userId}</strong>
                      <div className="user_avatar">
                        <Avatar fullName={user.fullName} imageUrl={user.avatar} />
                        <span>{user.fullName}</span>
                      </div>
                      <span className="email">{user.email}</span>
                      <div className="active">
                        <i
                          className={`fa fa-${!user.isDeleted ? 'check' : 'times'}`}
                          style={{ color: `${!user.isDeleted ? 'green' : 'red'}` }}
                        />
                      </div>
                    </div>
                  </Accordion.Title>
                  <Accordion.ButtonGroup>
                    <div className="button_group">
                      <Tooltip direction="top" text="Profile">
                        <Button
                          classes="white rounded"
                          className={`tab_button ${activeTab === 'profile' && 'active'}`}
                          onClick={() => setActiveTab('profile')}
                        >
                          <i className="fa fa-user" />
                          <span>Profile</span>
                        </Button>
                      </Tooltip>
                      <Tooltip direction="top" text="Orders">
                        <Button
                          classes="white rounded"
                          className={`tab_button ${activeTab === 'orders' && 'active'}`}
                          onClick={() => setActiveTab('orders')}
                        >
                          <i className="fa fa-list" />
                          <span>Orders</span>
                        </Button>
                      </Tooltip>
                      <Tooltip direction="top" text={!user.isDeleted ? 'Delete' : 'Restore'}>
                        <Button
                          classes="white rounded"
                          disabled={user.userId === userInfo?.userId}
                          onClick={() =>
                            !user.isDeleted
                              ? deleteUserHandler(user.userId)
                              : restoreUserHandler(user.userId)
                          }
                        >
                          <i className={`fa fa-${!user.isDeleted ? 'trash' : 'undo'}`} />
                          <span>{!user.isDeleted ? 'Delete' : 'Restore'}</span>
                        </Button>
                      </Tooltip>
                    </div>
                  </Accordion.ButtonGroup>
                </Accordion.Header>
                <Accordion.Body>
                  {activeTab === 'profile' && <Profile user={user} />}
                  {activeTab === 'orders' && <h1>Orders</h1>}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      ) : (
        <h2>There are no users to show</h2>
      )}
      <div className="footer">
        <Pagination
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
          pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
          totalItems={users?.[0]?.totalDBItems}
        />
      </div>
    </div>
  );
};

export default UserListAdmin;
