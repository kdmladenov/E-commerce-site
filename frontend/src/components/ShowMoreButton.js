import React, { useState } from 'react';
import Button from './Button';

const ShowMoreButton = ({ text, breakpoint }) => {
  const [showMore, setShowMore] = useState(false);

  const numberOfItems = showMore ? text.length : breakpoint;
  
  return (
    <div>
      <div>
        {text.slice(0, numberOfItems)}
        {!showMore && (
          <Button types="text" onClick={() => setShowMore(true)}>
            ...show more
          </Button>
        )}
        {showMore && (
          <Button types="text" onClick={() => setShowMore(false)}>
            ...show less
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShowMoreButton;
