import React from 'react';
import './styles/Divider.css';

const Divider = ({ direction }) => {
  return <div className={`divider ${direction && direction}`}></div>;
};

export default Divider;
