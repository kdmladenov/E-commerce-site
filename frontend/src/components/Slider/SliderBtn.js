import React from 'react';
import './styles/Slider.css';

const SliderBtn = ({ moveSlide, direction }) => {
  return (
    <button
      className={direction === 'next' ? 'slider_btn next' : 'slider_btn prev'}
      onClick={moveSlide}
    >
      <i className={direction === 'next' ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
    </button>
  );
};

export default SliderBtn;
