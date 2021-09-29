import React from 'react';
import { BASE_URL } from '../../constants/constants';
import Rating from '../Rating';
import ShowMoreButton from '../ShowMoreButton';
import './styles/ReviewCard.css';

const ReviewCard = ({
  // productId,
  // userId: authorId,
  // reviewId,
  rating,
  content,
  dateCreated,
  dateEdited,
  title,
  avatar,
  fullName
  // thumbsUp,
  // thumbsDown,
  // userThumbsUpList,
  // userThumbsDownList
}) => {
  return (
    <div className="review_card card">
      <div className="user_info">
        {/* <img src={`${BASE_URL}/${avatar}`} alt="user avatar" /> */}
        <i className="fa fa-user"></i>
        <div>{fullName}</div>
      </div>
      <div className="rating_title">
        <div className="rating">
          <Rating rating={rating || 0} />
        </div>
        <div className="title">{title}</div>
      </div>
      <div className="dates">
        <div className="date_created">
          {`Date created: ${new Date(dateCreated).toLocaleDateString('en-US')}`}
        </div>
        <div className="date_updated">
          {dateEdited && `Date edited: ${new Date(dateEdited).toLocaleDateString('en-US')}`}
        </div>
      </div>
      <div className="content card">
        {content.length > 300 ? <ShowMoreButton breakpoint={300} text={content} /> : content}
      </div>
    </div>
  );
};

export default ReviewCard;
