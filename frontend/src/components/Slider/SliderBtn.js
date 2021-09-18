import React from 'react';
import './styles/Slider.css';

const SliderBtn = ({ moveSlide, direction, style }) => {
  return (
    <button
      className={direction === 'next' ? `slider_btn next ${style}` : `slider_btn prev ${style}`}
      onClick={moveSlide}
    >
      <i className={direction === 'next' ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
    </button>
  );
};

export default SliderBtn;
