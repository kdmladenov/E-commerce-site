import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listReviews } from '../actions/reviewActions';
import {
  areReviewsFiltered,
  numberDecimalFix
} from '../constants/utility-functions/utility-functions';
import Rating from './Rating';
import './styles/RatingWidget.css';

const RatingWidget = ({ reviews, productId }) => {
  const dispatch = useDispatch();
  const [reviewsAreFiltered] = useState(areReviewsFiltered(reviews));

  const rating = reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length;

  const filterReviews = (starCount) => {
    // To fix useState not unfiltering the reviews
    if (reviews.filter((review) => review.rating === starCount).length > 0) {
      reviewsAreFiltered
        ? dispatch(listReviews(+productId))
        : dispatch(listReviews(+productId, `ratingMin=${+starCount}&ratingMax=${+starCount}`));
    }
  };

  return (
    reviews?.length && (
      <div className="rating_widget">
        <div className="header">
          <p>
            <Rating rating={rating} /> <h3>{`${numberDecimalFix(rating, 1)} out of 5`}</h3>
          </p>
          {`${reviews.length} ratings`}
        </div>
        <div className="content">
          {[5, 4, 3, 2, 1].map((starCount) => (
            <div
              className={`row ${
                reviews.filter((review) => review.rating === starCount).length > 0 && 'is_rated'
              }`}
              onClick={() => filterReviews(starCount)}
            >
              <div className="label">{`${starCount} star`}</div>
              <div className="bar_container">
                {reviews.filter((review) => review.rating === starCount).length > 0 && (
                  <div
                    className="bar_level"
                    style={{
                      width: `${
                        (reviews.filter((review) => review.rating === starCount).length * 100) /
                        reviews.length
                      }%`
                    }}
                  ></div>
                )}
              </div>
              <div className="label right">{`${numberDecimalFix(
                (reviews.filter((review) => review.rating === starCount).length * 100) /
                  reviews.length,
                0
              )}%`}</div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RatingWidget;
