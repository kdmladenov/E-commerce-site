import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants/constants';
import Rating from '../Rating';
import ShowMoreButton from '../ShowMoreButton';
import Button from '../Button';
import './styles/ReviewCard.css';
import { useDispatch } from 'react-redux';
import { editReview, listReviews } from '../../actions/reviewActions';

const ReviewCard = ({
  currentUser,
  createMode,
  setCreateMode,
  // productId,
  userId: authorId,
  reviewId,
  rating: ratingInState,
  content: contentInState,
  dateCreated,
  dateEdited,
  title: titleInState,
  avatar,
  fullName
  // thumbsUp,
  // thumbsDown,
  // userThumbsUpList,
  // userThumbsDownList
}) => {
  const [editMode, setEditMode] = useState(false);
  const [rating, setRating] = useState(ratingInState);
  const [content, setContent] = useState(contentInState);
  const [title, setTitle] = useState(titleInState);

  const dispatch = useDispatch();

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleCloseButton = () => {
    setEditMode(false);
    setRating(ratingInState);
    setContent(contentInState);
    setTitle(titleInState);
  };

  const handleDeleteButton = () => {};

  const handleSaveButton = () => {
    dispatch(editReview(reviewId, { title, content, rating }));
    setEditMode(false);
  };

  const buttonGroup = (
    <div className="button_group">
      {!editMode && (
        <Button types="icon" onClick={handleEditButton}>
          <i className="fa fa-edit"></i>
        </Button>
      )}
      {editMode && (
        <div className="button_group_edit">
          <Button types="icon" onClick={handleCloseButton}>
            <i className="fa fa-times"></i>
          </Button>
          <Button types="icon">
            <i className="fas fa-trash" onClick={handleDeleteButton}></i>
          </Button>
          <Button types="icon" onClick={handleSaveButton}>
            <i class="fa fa-save"></i>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="review_card card">
      <div className="user_info">
        <i className="fa fa-user"></i>
        <div>{fullName}</div>
      </div>
      <div className="rating_title">
        <div className="rating">
          <Rating rating={rating || 0} editMode={editMode} setRating={setRating} />
        </div>
        {editMode ? (
          <input
            type="text"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className="title">{title}</div>
        )}
      </div>
      <div className="dates">
        <div className="date_created">
          {`Date created: ${new Date(dateCreated).toLocaleDateString('en-US')}`}
        </div>
        <div className="date_updated">
          {dateEdited && `Date edited: ${new Date(dateEdited).toLocaleDateString('en-US')}`}
        </div>
      </div>
      {editMode ? (
        <input
          type="text"
          className="content card"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="content card">
          {content?.length > 300 ? <ShowMoreButton breakpoint={300} text={content} /> : content}
        </div>
      )}

      {currentUser.userId === authorId && buttonGroup}
    </div>
  );
};

export default ReviewCard;
