import React, { useState } from 'react';
import Rating from './Rating';
import ShowMoreButton from './ShowMoreButton';
import './styles/ReviewCard.css';
import { useDispatch } from 'react-redux';
import { createReview, deleteReview, editReview, voteReview } from '../actions/reviewActions';
import Votes from './Votes';
import EditButtons from './EditButtons';
import { getTimeDuration } from '../constants/utility-functions';
import Avatar from './Avatar';

const TITLE_MIN_LENGTH = 2;
const CONTENT_MIN_LENGTH = 5;

const ReviewCard = ({
  currentUser,
  createMode,
  setCreateMode,
  productId,
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
  const [rating, setRating] = useState(!createMode ? ratingInState : 0);
  const [content, setContent] = useState(!createMode ? contentInState : '');
  const [title, setTitle] = useState(!createMode ? titleInState : '');

  const dispatch = useDispatch();

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleCloseButton = () => {
    setEditMode(false);
    setCreateMode(false);
    setRating(ratingInState);
    setContent(contentInState);
    setTitle(titleInState);
  };

  const handleDeleteButton = () => {
    dispatch(deleteReview(reviewId));
    setEditMode(false);
    setCreateMode(false);
  };

  const handleSaveButton = () => {
    if (createMode) {
      dispatch(createReview(productId, { title, content, rating }));
      setCreateMode(false);
    } else if (editMode) {
      dispatch(editReview(reviewId, { title, content, rating }));
      setEditMode(false);
    }
  };

  const isFormValid =
    rating > 0 && content.length >= CONTENT_MIN_LENGTH && title.length >= TITLE_MIN_LENGTH; 

  

  return (
    <div className="review_card card">
      <div className="user_info">
        <Avatar classes='small' imageUrl={avatar} fullName={fullName} />
      </div>
      <div className="rating_title">
        <div className="rating">
          <Rating rating={rating || 0} editMode={editMode || createMode} setRating={setRating} />
        </div>
        <div className="title card">
          {editMode || createMode ? (
            <input
              type="text"
              placeholder="Your review title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            title
          )}
        </div>
      </div>
      <div className="review_content card">
        {editMode || createMode ? (
          <input
            type="textarea"
            value={content}
            placeholder="Your review content..."
            onChange={(e) => setContent(e.target.value)}
          />
        ) : content?.length > 300 ? (
          <ShowMoreButton breakpoint={300} text={content} />
        ) : (
          content
        )}
      </div>
      {!createMode && (
        <div className="footer">
          <Votes
            showButtons={!createMode}
            voteAction={voteReview}
            itemId={reviewId}
            reactionNameUp="THUMBS_UP"
            reactionNameDown="THUMBS_DOWN"
            votesUpCount={thumbsUp}
            votesDownCount={thumbsDown}
            userVotesUpList={userThumbsUpList}
            userVotesDownList={userThumbsDownList}
            currentUserId={currentUser?.userId}
          />

          <div className="dates">
            {!dateEdited
              ? `${getTimeDuration(dateCreated, new Date())}`
              : `edited ${getTimeDuration(dateEdited, new Date())}`}
          </div>
        </div>
      )}
      <EditButtons
        createMode={createMode}
        editMode={editMode}
        isCurrentUserId={currentUser?.userId === authorId}
        handleEditButton={handleEditButton}
        handleCloseButton={handleCloseButton}
        handleDeleteButton={handleDeleteButton}
        handleSaveButton={handleSaveButton}
        disabledSaveButton={!isFormValid}
      />
    </div>
  );
};

export default ReviewCard;
