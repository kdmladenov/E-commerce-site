import React from 'react';
import './styles/Toast.css'; 

const ToastCard = ({ type, onClose, children }) => {
  return (
    <div onClick={onClose} className={`toast card ${type}`}>
      {children}
    </div>
  );
};

export default ToastCard;
