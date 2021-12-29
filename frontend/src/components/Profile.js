import React, { useState } from 'react';
import {
  profileAddressInitialInputState,
  profileOverviewInitialInputState
} from '../constants/inputMaps';
import Button from './Button';
import FormComponent from './FormComponent';
import './styles/Profile.css';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useSelector } from 'react-redux';
import validateInputUser from '../validations/userValidator';
import ProfileSidebar from './ProfileSidebar';

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdateUser } = userUpdateProfile;

  return (
    <div className="profile">
      <ProfileSidebar user={user} />
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
          <FormComponent
            inputData={profileOverviewInitialInputState}
            updateAction={updateUserProfile}
            getDetailsAction={getUserDetails}
            resourceId={user?.userId}
            successUpdate={successUpdateUser}
            resource={user}
            validateInput={validateInputUser}
          />
        </div>
        <div className={`form ${activeTab === 'address' ? 'active' : ''}`}>
          <FormComponent
            inputData={profileAddressInitialInputState}
            updateAction={updateUserProfile}
            getDetailsAction={getUserDetails}
            resourceId={user?.userId}
            successUpdate={successUpdateUser}
            resource={user}
            validateInput={validateInputUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
