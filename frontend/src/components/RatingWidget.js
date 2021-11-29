import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listReviews } from '../actions/reviewActions';
import {
  areReviewsFiltered,
  numberDecimalFix
} from '../constants/utility-functions';
import Rating from './Rating';
import './styles/RatingWidget.css';

const RatingWidget = ({ reviews, ratingMap, productRating, reviewCount, productId }) => {
  const dispatch = useDispatch();
  const [reviewsAreFiltered] = useState(areReviewsFiltered(reviews));

  const rating = reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length;

  const filterReviews = (starCount) => {
    if (reviews.filter((review) => review.rating === starCount).length > 0) {
      reviewsAreFiltered
        ? dispatch(listReviews(+productId))
        : dispatch(listReviews(+productId, `ratingMin=${+starCount}&ratingMax=${+starCount}`));
    }
  };


  return reviews ? (
    <div className="rating_widget">
      <div className="header">
        <div className="rating_stars">
          <Rating rating={rating} /> <h3>{`${numberDecimalFix(rating, 1)} out of 5`}</h3>
        </div>
        {`${reviews.length} ratings`}
      </div>
      <div className="content">
        {[5, 4, 3, 2, 1].map((starCount) => (
          <div
            className={`row ${
              reviews.filter((review) => review.rating === starCount).length > 0 && 'is_rated'
            }`}
            onClick={() => filterReviews(starCount)}
            key={starCount}
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
  ) : (
    <div className="rating_widget">
      <div className="header">
        <div className="rating_stars">
          <Rating rating={productRating} />
          <h3>{`${numberDecimalFix(productRating, 1)} out of 5`}</h3>
        </div>
        {`${reviewCount} ratings`}
      </div>
      <div className="content">
        {[5, 4, 3, 2, 1].map((starCount) => (
          <div className="row" key={starCount}>
            <div className="label">{`${starCount} star`}</div>
            <div className="bar_container">
              {ratingMap[starCount] > 0 && (
                <div
                  className="bar_level"
                  style={{
                    width: `${(ratingMap[starCount] * 100) / reviewCount}%`
                  }}
                ></div>
              )}
            </div>
            <div className="label right">{`${numberDecimalFix(
              (ratingMap[starCount] * 100) / reviewCount,
              0
            )}%`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingWidget;
