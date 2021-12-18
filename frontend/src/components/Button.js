import React from 'react';
import './styles/Button.css';

// classes:
// rounding: rounded, circle
// sizes: small, medium, large
// colors: white, orange, red, blue
// types: icon, text

const Button = ({ classes, children, disabled, onClick }) => {
  return (
    <button className={`button_container ${classes}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
