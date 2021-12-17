import React from 'react';
import './styles/Divider.css';

const Divider = ({ vertical = false, margin = false, children }) => {
  return (
    <div className={`divider ${vertical ? 'vertical' : 'horizontal'} ${margin ? 'margin' : ''}`}>
      <span>{children}</span>
    </div>
  );
};

export default Divider;
