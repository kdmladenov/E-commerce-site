import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import {
  addressInitialInputState,
  overviewInitialInputState
} from '../../constants/inputInitialData';
import './styles/Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="profile">
      <div className="sidebar">
        <h2>Profile</h2>
        <button
          className={`tab_button ${activeTab === 'overview' && 'active'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab_button ${activeTab === 'address' && 'active'}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </button>
      </div>
      <div className="profile_form">
        <div className={`form ${activeTab === 'overview' ? 'active' : ''}`}>
          <ProfileForm inputData={overviewInitialInputState} />
        </div>
        <div className={`form ${activeTab === 'address' ? 'active' : ''}`}>
          <ProfileForm inputData={addressInitialInputState} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
