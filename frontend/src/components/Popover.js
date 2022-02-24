import React from 'react';

import './styles/Popover.css';

const Popover = ({ header, direction = 'top', children }) => {
  return (
    <div className="popover">
      {header}
      <div className={`body ${direction}`}>{children}</div>
    </div>
  );
};

export default Popover;
