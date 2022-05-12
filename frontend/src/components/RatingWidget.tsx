import React from 'react';

import './styles/RatingWidget.css';
import numberDecimalFix from '../helpers/numberDecimalFix';

import Rating from './Rating';
import RatingWidgetProps from '../models/components/RatingWidgetProps';

const RatingWidget: React.FC<RatingWidgetProps> = ({ product, updateQuery, ratingQuery = '' }) => {
  const { rating, reviewCount, starOne, starTwo, starThree, starFour, starFive } = product;

  const ratingMap: { [key: number]: number } = {
    1: starOne || 0,
    2: starTwo || 0,
    3: starThree || 0,
    4: starFour || 0,
    5: starFive || 0
  };

  const selectedRating = () => {
    const minRating = +ratingQuery?.split('=')?.[1]?.[0];
    const maxRating = +ratingQuery?.split('=')?.[2]?.[0];
    return minRating === maxRating ? minRating : null;
  };

  const filterReviews = (starCount: keyof typeof ratingMap) => {
    const noSelection = 'ratingMin=1&ratingMax=5&';
    if (ratingMap[starCount] > 0 && updateQuery) {
      // Selected different rating or No selection at all
      (ratingQuery !== noSelection && selectedRating() !== starCount) || ratingQuery === noSelection
        ? updateQuery('rating', `ratingMin=${+starCount}&ratingMax=${+starCount}&`)
        : updateQuery('rating', noSelection);
    }
  };

  return (
    <div className="rating_widget">
      <div className="header">
        <div className="rating_stars">
          <Rating rating={rating} /> <h3>{`${numberDecimalFix(rating, 1)} out of 5`}</h3>
        </div>
        {`${reviewCount} ratings`}
      </div>
      <div className="content">
        {[5, 4, 3, 2, 1].map((starCount) => (
          <div
            className={`row ${ratingMap[starCount] > 0 && 'is_rated'} ${
              selectedRating() && selectedRating() !== starCount ? 'unfiltered' : ''
            }`}
            onClick={() => filterReviews(starCount)}
            key={starCount}
          >
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
