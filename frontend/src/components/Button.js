import React from 'react';
import './styles/Button.css';

const Button = ({ classes, children, disabled, onClick }) => {
  return (
    <button className={`button_container ${classes}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
