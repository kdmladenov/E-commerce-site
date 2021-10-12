import React from 'react';
import './styles/Carousel_2.css';

const CarouselBtn_2 = ({ moveSlide, direction }) => {
  return (
    <button
      className={direction === 'next' ? 'carousel_btn next' : 'carousel_btn prev'}
      onClick={moveSlide}
    >
      <i className={direction === 'next' ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
    </button>
  );
};

export default CarouselBtn_2;
