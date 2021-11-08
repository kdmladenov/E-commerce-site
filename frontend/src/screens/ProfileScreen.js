import React, { useState } from 'react';
import About from '../components/About';
import './styles/ProfileScreen.css';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <main className="profile_screen">
      <div className="profile_container">
        <div className="header">
          <button
            className={`tab ${activeTab === 'about' && 'active'}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === 'orders' && 'active'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab ${activeTab === 'browsing_history' && 'active'}`}
            onClick={() => setActiveTab('browsing_history')}
          >
            Browsing History
          </button>
          <button
            className={`tab ${activeTab === 'wish_list' && 'active'}`}
            onClick={() => setActiveTab('wish_list')}
          >
            Wish List
          </button>
        </div>
        <section className={`about_container content ${activeTab === 'about' && 'active'}`}>
          <About />
        </section>
        <section className={`orders_container content ${activeTab === 'orders' && 'active'}`}>
          order content
        </section>
        <section
          className={`browsing_history_container content ${
            activeTab === 'browsing_history' && 'active'
          }`}
        >
          history content
        </section>
        <section className={`wish_list_container content ${activeTab === 'wish_list' && 'active'}`}>
          wish content
        </section>
      </div>
    </main>
  );
};

export default ProfileScreen;
