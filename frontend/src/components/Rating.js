import React from 'react';
import PropTypes from 'prop-types';

import './styles/Rating.css';
import { RATING_STAR_COUNT } from '../constants/constants';

const Rating = ({ rating, setRating, text, color, editMode }) => {
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

Rating.defaultProps = {
  editMode: false,
  color: 'orange',
  rating: 0,
  text: ''
};

Rating.propTypes = {
  editMode: PropTypes.bool,
  rating: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string
};

export default Rating;
