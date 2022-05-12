import React from 'react';
import RibbonProps from '../models/components/RibbonProps';
import './styles/Ribbon.css';

const Ribbon: React.FC<RibbonProps> = ({ children, color }) => {
  return <div className={`ribbon ${color ? color : ''}`}>{children}</div>;
};

export default Ribbon;
