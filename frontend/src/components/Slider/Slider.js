import React, { useState } from 'react';
import SliderBtn from './SliderBtn';
import './styles/Slider.css';

const Slider = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () => {
    setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : images.length - 1);
  };

  const nextSlide = () => {
    setSlideIndex(slideIndex !== images.length - 1 ? slideIndex + 1 : 0);
  };

  return (
    <main className="slider_container">
      {images.map((image, index) => (
        <div className={slideIndex === index ? 'slide active' : 'slide'}>
          <img src={image} alt={image} />
        </div>
      ))}
      <SliderBtn moveSlide={prevSlide} direction={'prev'} />
      <SliderBtn moveSlide={nextSlide} direction={'next'} />
      <div className="slider_dots">
        {images.map((_, index) => (
          <div
            className={slideIndex === index ? 'dot active' : 'dot'}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </main>
  );
};

export default Slider;
