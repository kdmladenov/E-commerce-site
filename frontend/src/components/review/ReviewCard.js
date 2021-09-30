import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants/constants';
import Rating from '../Rating';
import ShowMoreButton from '../ShowMoreButton';
import Button from '../Button';
import './styles/ReviewCard.css';
import { useDispatch } from 'react-redux';
import { editReview, listReviews, voteReview } from '../../actions/reviewActions';

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
  fullName,
  thumbsUp,
  thumbsDown,
  userThumbsUpList,
  userThumbsDownList
}) => {
  const [editMode, setEditMode] = useState(false);
  const [rating, setRating] = useState(ratingInState);
  const [content, setContent] = useState(contentInState);
  const [title, setTitle] = useState(titleInState);
  const [countThumbsUp, setCountThumbsUp] = useState(thumbsUp);
  const [countThumbsDown, setCountThumbsDown] = useState(thumbsDown);

  const [currentVote, setCurrentVote] = useState(
    userThumbsUpList?.toString().split(',').map(Number).includes(currentUser.userId)
      ? 'UP'
      : userThumbsDownList?.toString().split(',').map(Number).includes(currentUser.userId)
      ? 'DOWN'
      : ''
  );

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

  const handleVoteButton = (method, reactionName) => {
    dispatch(voteReview(reviewId, method, reactionName));

    if (method === 'POST') {
      if (reactionName === 'THUMBS_UP') {
        if (currentVote === 'DOWN') {
          setCountThumbsDown(countThumbsDown - 1);
        }
        setCurrentVote('UP');
        setCountThumbsUp(countThumbsUp + 1);
      } else if (reactionName === 'THUMBS_DOWN') {
        if (currentVote === 'UP') {
          setCountThumbsUp(countThumbsUp - 1);
        }
        setCurrentVote('DOWN');
        setCountThumbsDown(countThumbsDown + 1);
      }
    } else if (method === 'DELETE') {
      if (reactionName === 'THUMBS_UP') {
        setCurrentVote('');
        setCountThumbsUp(countThumbsUp - 1);
      } else if (reactionName === 'THUMBS_DOWN') {
        setCurrentVote('');
        setCountThumbsDown(countThumbsDown - 1);
      }
    }
  };

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
      <div className="review-card-thumbs">
        <Button
          types="icon"
          onClick={
            currentVote === '' || currentVote === 'DOWN'
              ? () => handleVoteButton('POST', 'THUMBS_UP')
              : () => handleVoteButton('DELETE', 'THUMBS_UP')
          }
        >
          <i className={`fa fa-thumbs-up ${currentVote === 'UP' ? 'active' : 'inactive'}`}></i>
        </Button>
        <div className="thumb_count">{countThumbsUp || 0}</div>
        <Button
          types="icon"
          onClick={
            currentVote === '' || currentVote === 'UP'
              ? () => handleVoteButton('POST', 'THUMBS_DOWN')
              : () => handleVoteButton('DELETE', 'THUMBS_DOWN')
          }
        >
          <i className={`fa fa-thumbs-down ${currentVote === 'DOWN' ? 'active' : 'inactive'}`}></i>
        </Button>
        <div className="thumb_count">{countThumbsDown || 0}</div>
      </div>
      {currentUser.userId === authorId && (
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
      )}
    </div>
  );
};

export default ReviewCard;
