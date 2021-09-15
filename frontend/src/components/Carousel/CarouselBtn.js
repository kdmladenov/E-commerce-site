import React from 'react';
import './styles/Carousel.css';

const CarouselBtn = ({ moveSlide, direction }) => {
  return (
    <button
      className={direction === 'next' ? 'carousel_btn next' : 'carousel_btn prev'}
      onClick={moveSlide}
    >
      <i className={direction === 'next' ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
    </button>
  );
};

export default CarouselBtn;
