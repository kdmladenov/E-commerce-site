import React from 'react';
import { randomNumber } from '../constants/utility-functions/utility-functions';
import './styles/Avatar.css';

const Avatar = ({ type, imageUrl, fullName }) => {
  const firstName = fullName?.split(' ')[0];
  const firstInitials = `${fullName?.split(' ')[0][0]}${fullName?.split(' ')[1][0]}`;

  const backgroundColors = ['peeps', 'watermelon', 'mimosa', 'kiwi', 'hendrix', 'thanos'];

  return (
    <div className={`avatar card ${type?.includes('small') ? 'small' : ''}`}>
      {!type?.includes('name_only') && (
        <div className="image card">
          {imageUrl ? (
            <img src={imageUrl} alt="user" />
          ) : fullName ? (
            <div
              className="initials"
              style={{
                background: `var(--${backgroundColors[randomNumber(0, backgroundColors.length - 1)]})`
              }}
            >
              {firstInitials}
            </div>
          ) : (
            <i className="fa fa-user"></i>
          )}
        </div>
      )}
      {fullName && !type?.includes('image_only') && (
        <div className="name">{type?.includes('header') ? firstName : fullName}</div>
      )}
    </div>
  );
};

export default Avatar;

//${currentUser?.userId === authorId ? 'you' : fullName}
