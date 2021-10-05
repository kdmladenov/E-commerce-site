import React from 'react';
import './styles/Tooltip.css';

const Tooltip = ({ visible, children }) => {
  return <div className={`tooltip card ${visible && 'visible'}`}>{children}</div>;
};

export default Tooltip;
