import React, { useState } from 'react';
import {
  profileAddressInitialInputState,
  profileOverviewInitialInputState
} from '../constants/inputMaps';
import Button from './Button';
import FormComponent from './FormComponent';
import Avatar from './Avatar';
import './styles/Profile.css';

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="profile">
      <div className="sidebar">
        <h2>Profile</h2>
        <div className="avatar_container">
          <Avatar classes="large" imageUrl={user?.avatar} fullName={user?.fullName} />
        </div>
      </div>
      <div className="profile_header">
        <Button
          classes={`rounded large ${activeTab === 'overview' ? 'blue_light' : 'white'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Button>
        <Button
          classes={`rounded large ${activeTab === 'address' ? 'blue_light' : 'white'}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </Button>
      </div>
      <div className="profile_form">
        <div className={`form ${activeTab === 'overview' ? 'active' : ''}`}>
          <FormComponent inputData={profileOverviewInitialInputState} currentUser={user} />
        </div>
        <div className={`form ${activeTab === 'address' ? 'active' : ''}`}>
          <FormComponent inputData={profileAddressInitialInputState} currentUser={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
