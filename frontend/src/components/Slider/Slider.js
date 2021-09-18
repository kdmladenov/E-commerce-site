import React, { useState } from 'react';
import SliderBtn from './SliderBtn';
import './styles/Slider.css';

const Slider = ({ images, dots, prevBtnClass, nextBtnClass }) => {
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
        <div className={slideIndex === index ? 'slide active' : 'slide'} key={index}>
          <img src={image} alt={image} />
        </div>
      ))}
      <SliderBtn moveSlide={prevSlide} direction={'prev'} style={prevBtnClass} />
      <SliderBtn moveSlide={nextSlide} direction={'next'} style={nextBtnClass} />
      {dots && (
        <div className="slider_dots">
          {images.map((_, index) => (
            <div
              className={slideIndex === index ? 'dot active' : 'dot'}
              onClick={() => setSlideIndex(index)}
              key={index}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Slider;
