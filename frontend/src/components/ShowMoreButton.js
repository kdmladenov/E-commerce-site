import React, { useState } from "react";

const ShowMoreButton = ({ text, breakpoint }) => {
  const [showMore, setShowMore] = useState(false);

  const showMoreClick = () => {
    setShowMore(true);
  };

  const showLessClick = () => {
    setShowMore(false);
  };

  const numberOfItems = showMore ? text.length : breakpoint;
  return (
    <div>
      <div>
        {text.slice(0, numberOfItems)}
        {!showMore && (
          <button
            type="button"
            onClick={() => showMoreClick()}
          >
            ...show more
          </button>
        )}
        {showMore && (
          <button
            type="button"
            onClick={() => showLessClick()}
          >
            ...show less
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowMoreButton;
