import React, {useRef} from 'react';
import { useResize } from '../hooks/useResize';
import './styles/Carousel.css';

const Carousel = ({ children }) => {
  const sliderRef = useRef();
  const bodyPosition = useResize(sliderRef);

  const slide = (direction) => {
    let scrollCompleted = 0;
    const slider = setInterval(() => {
      direction === 'left'
        ? (sliderRef.current.scrollLeft -= 10)
        : (sliderRef.current.scrollLeft += 10);

      scrollCompleted += 10;
      if (scrollCompleted >= bodyPosition.width) {
        window.clearInterval(slider);
      }
    }, 10);
  };

  return (
    <div className="carousel_container card">
      <div className="carousel_slider" ref={sliderRef}>
        {children}
      </div>
      <button onClick={() => slide('right')} className="carousel_btn next">
        <i class="fas fa-chevron-right"></i>
      </button>
      <button onClick={() => slide('left')} className="carousel_btn prev">
        <i class="fas fa-chevron-left"></i>
      </button>
    </div>
  );
};

export default Carousel;
