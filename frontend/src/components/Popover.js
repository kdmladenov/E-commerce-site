import React from 'react';
import './styles/Popover.css';

const Popover = ({ header, direction, children }) => {
  return (
    <div className="popover">
      {header}
      <div className={`body ${direction ? direction : 'bottom'}`}>{children}</div>
    </div>
  );
};

export default Popover;
