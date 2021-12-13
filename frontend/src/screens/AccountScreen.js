import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import OrdersMy from '../components/OrdersMy';
import './styles/AccountScreen.css';
import History from '../components/History';
import WishList from '../components/WishList';

const AccountScreen = ({ match, history }) => {
  const section = match.params.section;
  const [activeTab, setActiveTab] = useState(section);

  useEffect(() => setActiveTab(section), [section]);

  return (
    <main className="account_screen">
      <div className="account_container">
        <div className="header card">
          <button
            className={`tab ${activeTab === 'profile' && 'active'}`}
            onClick={() => history.push('/account/profile')}
          >
            Profile
          </button>
          <button
            className={`tab ${activeTab === 'orders' && 'active'}`}
            onClick={() => history.push('/account/orders')}
          >
            Orders
          </button>
          <button
            className={`tab ${activeTab === 'history' && 'active'}`}
            onClick={() => history.push('/account/history')}
          >
            Browsing History
          </button>
          <button
            className={`tab ${activeTab === 'wishlist' && 'active'}`}
            onClick={() => history.push('/account/wishlist')}
          >
            Wish List
          </button>
        </div>
        <section
          className={`profile_container card content ${activeTab === 'profile' && 'active'}`}
        >
          <Profile />
        </section>
        <section className={`orders_container card content ${activeTab === 'orders' && 'active'}`}>
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
