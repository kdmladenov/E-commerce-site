import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/AccountScreen.css';
import { getUserDetails } from '../state/actions/userActions';
import useTypedSelector from '../hooks/useTypedSelector';

import Profile from '../components/Profile';
import OrdersMy from '../components/OrdersMy';
import History from '../components/History';
import WishList from '../components/WishList';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ButtonNav from '../components/ButtonNav';
import { RouteComponentProps } from 'react-router-dom';

const AccountScreen: React.FC<
  RouteComponentProps<{
    section: string;
  }>
> = ({ match }) => {
  const dispatch = useDispatch();

  const { section } = match.params;
  const [activeTab, setActiveTab] = useState(section);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const {
    user,
    loading: loadingUser,
    error: errorUser
  } = useTypedSelector((state) => state.userDetails);

  const { success: successUpdateAvatar } = useTypedSelector((state) => state.userAvatarUpdate);

  const { success: successDeleteAvatar } = useTypedSelector((state) => state.userAvatarDelete);

  useEffect(() => {
    if (!user?.email || successUpdateAvatar || successDeleteAvatar) {
      dispatch(getUserDetails(userInfo?.userId));
    }
    setActiveTab(section);
  }, [dispatch, userInfo, successUpdateAvatar, successDeleteAvatar, section]);

  return (
    <main className="account_screen">
      <div className="account_container">
        <ButtonNav activeTab={activeTab} screen="account" />
        <section
          className={`profile_container card content ${activeTab === 'profile' && 'active'}`}
        >
          {loadingUser ? (
            <Loader />
          ) : errorUser ? (
            <Message type="error">{errorUser}</Message>
          ) : (
            <Profile user={user} />
          )}
        </section>
        <section className={`orders_container content ${activeTab === 'orders' && 'active'}`}>
          <OrdersMy />
        </section>
        <section
          className={`browsing_history_container card content ${
            activeTab === 'history' && 'active'
          }`}
        >
          <History />
        </section>
        <section
          className={`wish_list_container card content ${activeTab === 'wishlist' && 'active'}`}
        >
          <WishList />
        </section>
      </div>
    </main>
  );
};

export default AccountScreen;
