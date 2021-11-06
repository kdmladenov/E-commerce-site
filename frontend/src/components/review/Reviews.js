import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import Button from '../Button';
import './styles/Reviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userActions';

const reviewCountAtStart = 3;

const Reviews = ({ reviews, currentUser, productId }) => {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleOpenCreateForm = () => {
    setCreateMode(true);
  };

  useEffect(() => {
    dispatch(getUserDetails(currentUser?.userId));
  }, [dispatch, currentUser?.userId, reviews]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const hasUserLeftReview = reviews.some((review) => review.userId === currentUser?.userId);

  return (
    <div className="reviews-list">
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
      {(showAllReviews
        ? [
            ...reviews?.filter((review) => +review.userId === +currentUser?.userId),
            ...reviews?.filter((review) => +review.userId !== +currentUser?.userId)
          ]
        : [
            ...reviews?.filter((review) => +review.userId === +currentUser?.userId),
            ...reviews?.filter((review) => +review.userId !== +currentUser?.userId)
          ].slice(0, reviewCountAtStart)
      ).map((review) => {
        return (
          <ReviewCard
            key={review.reviewId}
            {...review}
            currentUser={currentUser}
            createMode={false}
            setCreateMode={setCreateMode}
          />
        );
      })}
      {reviews?.length > 1 &&
        (!showAllReviews ? (
          <Button types="text" onClick={() => setShowAllReviews(!showAllReviews)}>
            <i class="fa fa-chevron-down"></i>{' '}
            {`See more reviews (${reviews?.length - reviewCountAtStart})`}
          </Button>
        ) : (
          <Button types="text" onClick={() => setShowAllReviews(!showAllReviews)}>
            <i class="fa fa-chevron-up"></i> {`Collapse reviews`}
          </Button>
        ))}
    </div>
  );
};

export default Reviews;
