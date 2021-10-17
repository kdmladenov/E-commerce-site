import React, { useState } from 'react';
import Rating from '../Rating';
import ShowMoreButton from '../ShowMoreButton';
import Button from '../Button';
import './styles/ReviewCard.css';
import { useDispatch } from 'react-redux';
import { createReview, deleteReview, editReview, voteReview } from '../../actions/reviewActions';
import Votes from '../Votes';
import EditButtons from '../EditButtons';

const ReviewCard = ({
  user,
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

  return (
    <div className="review_card card">
      <div className="user_info">
        <i className="fa fa-user"></i>
        <div>{fullName}</div>
      </div>
      <div className="rating_title">
        <div className="rating">
          <Rating rating={rating || 0} editMode={editMode || createMode} setRating={setRating} />
        </div>
        {editMode || createMode ? (
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
      {!createMode && (
        <div className="dates">
          <div className="date_created">
            {`Date created: ${new Date(dateCreated || Date.now()).toLocaleDateString('en-US')}`}
          </div>
          <div className="date_updated">
            {dateEdited && `Date edited: ${new Date(dateEdited).toLocaleDateString('en-US')}`}
          </div>
        </div>
      )}
      {editMode || createMode ? (
        <input
          type="text"
          className="textarea card"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="textarea card">
          {content?.length > 300 ? <ShowMoreButton breakpoint={300} text={content} /> : content}
        </div>
      )}
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
      <EditButtons
        createMode={createMode}
        editMode={editMode}
        isCurrentUserId={currentUser?.userId === authorId}
        handleEditButton={handleEditButton}
        handleCloseButton={handleCloseButton}
        handleDeleteButton={handleDeleteButton}
        handleSaveButton={handleSaveButton}
      />
    </div>
  );
};

export default ReviewCard;
