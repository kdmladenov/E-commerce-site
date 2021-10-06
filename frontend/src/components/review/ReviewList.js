import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import Button from '../Button';
import './styles/ReviewList.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userActions';

const ReviewList = ({ reviews, currentUser, productId }) => {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);

  const handleOpenCreateForm = () => {
    setCreateMode(true);
  };

  useEffect(() => {
    dispatch(getUserDetails(currentUser?.userId));
  }, [dispatch, currentUser?.userId]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const hasUserLeftReview = reviews.some((review) => review.userId === currentUser?.userId);

  const otherUsersReviewCardsToShow = reviews
    ?.filter((review) => review.userId !== currentUser?.userId)
    ?.map((review) => {
      return (
        <ReviewCard
          key={review.reviewId}
          {...review}
          currentUser={currentUser}
          createMode={false}
          setCreateMode={setCreateMode}
        />
      );
    });
      const currentUserReviewCardToShow = reviews
        ?.filter((review) => review.userId === currentUser?.userId)
        ?.map((review) => {
          return (
            <ReviewCard
              key={review.reviewId}
              {...review}
              currentUser={currentUser}
              createMode={false}
              setCreateMode={setCreateMode}
            />
          );
        });

  return (
    <div className="reviews-container">
      <h2>Reviews:</h2>
      {!hasUserLeftReview && !createMode && (
        <Button onClick={handleOpenCreateForm}>
          <i className="fa fa-plus"></i> Create Review
        </Button>
      )}
      {createMode && (
        <ReviewCard
          createMode={createMode}
          setCreateMode={setCreateMode}
          currentUser={currentUser}
          productId={productId}
          fullName={user.fullName}
          userId={user.userId}
          avatar={user.avatar}
        />
      )}
      {currentUserReviewCardToShow}
      {otherUsersReviewCardsToShow}
    </div>
  );
};

export default ReviewList;
