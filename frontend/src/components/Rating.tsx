import React from 'react';

import './styles/Rating.css';
import { RATING_STAR_COUNT } from '../constants/constants';
import RatingProps from '../models/components/RatingProps';

const Rating: React.FC<RatingProps> = ({ rating, setRating, text, color = 'orange', editMode }) => {
  return (
    <div className="star_rating">
      {Array.from({ length: RATING_STAR_COUNT }).map((_, index) => (
        <span key={index}>
          <i
            onClick={() => editMode && setRating(index + 1)}
            style={{ color }}
            className={
              rating >= index + 1
                ? 'fas fa-star'
                : rating >= index + 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
