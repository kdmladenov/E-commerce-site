import React, { useState } from 'react';
import './styles/Slider.css';

const Slider = ({ images, dots }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlideHandler = () => {
    setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : images.length - 1);
  };

  const nextSlideHandler = () => {
    setSlideIndex(slideIndex !== images.length - 1 ? slideIndex + 1 : 0);
  };

  return (
    <div className="slider_container">
      {images.map((image, index) => (
        <div className={slideIndex === index ? 'slide active' : 'slide'} key={index}>
          <img src={image} alt={image} />
        </div>
      ))}
      <button className="slider_btn prev" onClick={prevSlideHandler}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider_btn next" onClick={nextSlideHandler}>
        <i className="fas fa-chevron-right"></i>
      </button>
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
    </div>
  );
};

export default Slider;
