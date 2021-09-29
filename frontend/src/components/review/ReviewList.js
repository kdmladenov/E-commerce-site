import React from 'react';
import ReviewCard from './ReviewCard';
import './styles/ReviewList.css';

const ReviewList = ({ reviews }) => {
  const reviewCardsToShow = reviews?.map((review) => {
    return <ReviewCard key={review.reviewId} {...review} />;
  });
  return (
    <div className="reviews-container">
      <h2>Reviews:</h2>
      {reviewCardsToShow}
    </div>
  );
};

export default ReviewList;
