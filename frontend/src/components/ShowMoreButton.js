import React, { useState } from 'react';
import './styles/ShowMoreButton.css';

const ShowMoreButton = ({ text, breakpoint }) => {
  const [showMore, setShowMore] = useState(false);

  const numberOfItems = showMore ? text.length : breakpoint;

  return (
    <div className="show_more_button">
      {text.slice(0, numberOfItems)}{' '}
      <button classes="text" onClick={() => setShowMore(!showMore)}>
        {!showMore ? ' ...show more' : ' ...show less'}
      </button>
    </div>
  );
};

export default ShowMoreButton;
