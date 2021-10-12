import React, { useRef, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import './styles/Carousel_2.css';

const Carousel_2 = ({ children }) => {

  const bodyRef = useRef()
  const bodyPosition = useResize(bodyRef)

  return (
    <div className="carousel_2_container card">
      <div className="carousel_2_body" ref={bodyRef}>
        {children}
      </div>
      <button className="carousel_2_btn next">n</button>
    </div>
  );
};

export default Carousel_2;
