import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import OrdersMy from '../components/OrdersMy';
import './styles/AccountScreen.css';
import History from '../components/History';
import WishList from '../components/WishList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../state/actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ButtonNav from '../components/ButtonNav';

const AccountScreen = ({ match }) => {
  const dispatch = useDispatch();

  const section = match.params.section;
  const [activeTab, setActiveTab] = useState(section);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    user,
    loading: loadingUser,
    error: errorUser
  } = useSelector((state) => state.userDetails);

  const { success: successUpdateAvatar } = useSelector((state) => state.userAvatarUpdate);

  const { success: successDeleteAvatar } = useSelector((state) => state.userAvatarDelete);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
    setActiveTab(section);
  }, [dispatch, user, userInfo, successUpdateAvatar, successDeleteAvatar, section]);

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
