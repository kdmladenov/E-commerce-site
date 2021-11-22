import React, { useState } from 'react';
import './styles/DropDown.css';
import Tooltip from './Tooltip';

const DropDown = ({ button, tooltipText, children }) => {
  const [showBody, setShowBody] = useState(false);

  return (
    <div
      className="dropdown"
      onClick={() => setShowBody(!showBody)}
      onMouseLeave={() => setShowBody(false)}
    >
      {(tooltipText && !showBody) ? <Tooltip text={tooltipText}>{button}</Tooltip> : button}
      <div className={`body ${showBody ? 'show' : ''}`}>{children}</div>
    </div>
  );
};

export default DropDown;
