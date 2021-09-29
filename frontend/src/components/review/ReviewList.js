import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import './styles/ReviewList.css';

const ReviewList = ({ reviews, currentUser }) => {
  const [createMode, setCreateMode] = useState(false);

  const hasUserLeftReview = reviews.filter((review) => review.userId === currentUser.userId).length > 0;

  const reviewCardsToShow = reviews?.map((review) => {
    return <ReviewCard key={review.reviewId} {...review} currentUser={currentUser} />;
  });

  return (
    <div className="reviews-container">
      <h2>Reviews:</h2>
      {hasUserLeftReview && (
        <ReviewCard currentUser={currentUser} createMode={createMode} setCreateMode={setCreateMode}/>
      )}
      {reviewCardsToShow}
    </div>
  );
};

export default ReviewList;
