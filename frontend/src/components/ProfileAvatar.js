import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProfileAvatar.css';
import { deleteUserAvatar, updateUserAvatarReducer } from '../state/actions/userActions';

import Avatar from './Avatar';
import Button from './Button';
import Divider from './Divider';

const ProfileAvatar = ({ user }) => {
  const dispatch = useDispatch();
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const [image, setImage] = useState('');

  const uploadImage = (e) => {
    dispatch(updateUserAvatarReducer(user?.userId, 'file_upload', e));
  };

  const addProductImageUrlHandler = (e) => {
    dispatch(updateUserAvatarReducer(user?.userId, 'add_image_url', e, image));
    setImage('');
  };

  const keyPressHandler = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      dispatch(updateUserAvatarReducer(user?.userId, 'add_image_url', e, image));
      setImage('');
    }
  };

  return (
    <div className="profile_avatar">
      <div className="avatar_container">
        <Avatar classes="large" imageUrl={user?.avatar} fullName={user?.fullName} />
        <Button classes="icon" onClick={() => setShowImageUrlForm(!showImageUrlForm)}>
          <i className="fa fa-camera" />
        </Button>
        <Button classes="icon delete" onClick={() => dispatch(deleteUserAvatar(user?.userId))}>
          <i className="fas fa-trash" />
        </Button>
      </div>
      {showImageUrlForm && (
        <div className="input_group">
          <div class="file_upload">
            <Button>
              <label htmlFor="upload">Choose file</label>
              <input id="upload" type="file" onChange={uploadImage} />
            </Button>
          </div>
          <Divider>
            <h6>or</h6>
          </Divider>
          <div className="image_url">
            <Button onClick={addProductImageUrlHandler} disabled={!image}>
              Add Image URL
            </Button>
            <input
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              onKeyUp={(e) => keyPressHandler(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
