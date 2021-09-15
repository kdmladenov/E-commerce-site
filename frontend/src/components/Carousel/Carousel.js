import React, { useState } from 'react';
import CarouselBtn from './CarouselBtn';
import './styles/Carousel.css';

const SLIDES_PER_PAGE = 7;

const groupNumberOfSlidePages = (slidesPerPage, allSlidesArray) => {
  return allSlidesArray.reduce((groupedArray, slide, index) => {
    const pageIndex = Math.floor(index / slidesPerPage);
    if (!groupedArray[pageIndex]) {
      groupedArray[pageIndex] = [];
    }
    groupedArray[pageIndex].push(slide);
    return groupedArray;
  }, []);
};

const Carousel = ({ height, slides }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const groupedArrayBySlidesPerPage = groupNumberOfSlidePages(SLIDES_PER_PAGE, slides);

  const slidesRowToRender = groupedArrayBySlidesPerPage.map(
    (slideGroup, index) =>
      slideIndex === index &&
      slideGroup.map((slide) => (
        <div className="carousel_slide">
          <img src={slide} alt={slide} />
        </div>
      ))
  );

  const pageDotsToRender = Array.from({ length: Math.ceil(slides.length / SLIDES_PER_PAGE) }).map(
    (_, index) => (
      <div
        className={slideIndex === index ? 'dot active' : 'dot'}
        onClick={() => setSlideIndex(index)}
      />
    )
  );

  const prevSlide = () => {
    setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : groupedArrayBySlidesPerPage.length - 1);
  };

  const nextSlide = () => {
    setSlideIndex(slideIndex !== groupedArrayBySlidesPerPage.length - 1 ? slideIndex + 1 : 0);
  };

  return (
    <div className="carousel_container" style={{ height: `${height}` }}>
      <div className="carousel_box">{slidesRowToRender}</div>
      <CarouselBtn moveSlide={prevSlide} direction={'prev'} />
      <CarouselBtn moveSlide={nextSlide} direction={'next'} />
      <div className="carousel_dots">{pageDotsToRender}</div>
    </div>
  );
};

export default Carousel;
