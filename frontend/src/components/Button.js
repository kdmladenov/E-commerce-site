import React from 'react';
import './styles/Button.css';

const Button = ({ types, children, disabled, onClick }) => {
  return (
    <button className={`button_container ${types}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
