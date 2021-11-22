import React from 'react';
import './styles/Tooltip.css';

const Tooltip = ({ text, direction, children }) => {
  return (
    <div className="tooltip">
      {children}
      <div className={`tooltip_body ${direction ? direction : 'bottom'}`}>{text}</div>
    </div>
  );
};

export default Tooltip;
