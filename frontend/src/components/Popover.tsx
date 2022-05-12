import React from 'react';
import PopoverProps from '../models/components/PopoverProps';

import './styles/Popover.css';

const Popover: React.FC<PopoverProps> = ({ header, direction = 'top', children }) => {
  return (
    <div className="popover">
      {header}
      <div className={`body ${direction}`}>{children}</div>
    </div>
  );
};

export default Popover;
