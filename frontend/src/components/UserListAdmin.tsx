import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/UserListAdmin.css';
import { deleteUser, listUsers, restoreUser } from '../state/actions/userActions';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { adminListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { adminUserListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import useTypedSelector from '../hooks/useTypedSelector';

import Button from './Button';
import Accordion from './Accordion';
import Loader from './Loader';
import Message from './Message';
import Profile from './Profile';
import Pagination from './Pagination';
import HeaderControls from './HeaderControls';
import Avatar from './Avatar';
import Tooltip from './Tooltip';
import { useHistory } from 'react-router-dom';
import ModalConfirmContent from './ModalConfirmContent';
import Modal from './Modal';

const UserListAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState('profile');
  const [endpoint, setEndpoint] = useState(defaultEndpoint['userListAdmin']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { users, loading, error } = useTypedSelector((state) => state.userList);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { success: deleteSuccess } = useTypedSelector((state) => state.userDelete);

  const { success: restoreSuccess } = useTypedSelector((state) => state.userRestore);

  const { success: successUpdateAvatar } = useTypedSelector((state) => state.userAvatarUpdate);

  const { success: successDeleteAvatar } = useTypedSelector((state) => state.userAvatarDelete);

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

  const deleteUserHandler = (userId: number) => {
    setIsModalOpen(true);
    setModalContent(
      <ModalConfirmContent
        setIsModalOpen={setIsModalOpen}
        message="Are your sure you want to delete this user?"
        resourceId={userId}
        action={deleteUser}
      />
    );
  };
    const restoreUserHandler = (userId: number) => {
      setIsModalOpen(true);
      setModalContent(
        <ModalConfirmContent
          setIsModalOpen={setIsModalOpen}
          message="Are your sure you want to restore this user?"
          resourceId={userId}
          action={restoreUser}
        />
      );
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
                          classes={`tab_button white rounded ${
                            activeTab === 'profile' && 'active'
                          }`}
                          onClick={() => setActiveTab('profile')}
                        >
                          <i className="fa fa-user" />
                          <span>Profile</span>
                        </Button>
                      </Tooltip>
                      <Tooltip direction="top" text="Orders">
                        <Button
                          classes={`tab_button white rounded ${activeTab === 'orders' && 'active'}`}
                          onClick={() => setActiveTab('orders')}
                        >
                          <i className="fa fa-list" />
                          <span>Orders TODO</span>
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
      {isModalOpen && (
        <Modal classes="confirm" setIsOpenModal={setIsModalOpen}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default UserListAdmin;
