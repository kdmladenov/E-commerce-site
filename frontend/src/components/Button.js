import React from 'react';
import './styles/Button.css';

const Button = ({ types, children, disabled, onClick }) => {
  console.log(types);
  return (
    <button className={`button_container ${types}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button
