import React from 'react';
import './styles/Ribbon.css';

const Ribbon = ({children, color}) => {
  return <div className={`ribbon ${color ? color : ''}`}>{children}</div>;
};

export default Ribbon;
