import React from 'react';
import Button from './Button';
import { scrollTo } from '../constants/utility-functions';
import './styles/StickyNav.css';

const StickyNav = ({
  detailsRef,
  featuresRef,
  specsRef,
  comparisonRef,
  reviewsRef,
  questionsAndAnswersRef
}) => {

  // const scrollToTop = () => {
  //   document.body.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  //   document.documentElement.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  return (
    <div className="sticky_vav_container">
      <Button classes="white" onClick={() => scrollTo(featuresRef, 50)}>
        Details
      </Button>
      <Button classes="white" onClick={() => scrollTo(featuresRef, 50)}>
        Features
      </Button>
      <Button classes="white" onClick={() => scrollTo(featuresRef, 50)}>
        Features
      </Button>
      <Button classes="white" onClick={() => scrollTo(specsRef, 50)}>
        Specifications
      </Button>
      <Button classes="white" onClick={() => scrollTo(comparisonRef, 50)}>
        Comparison
      </Button>
      <Button classes="white" onClick={() => scrollTo(reviewsRef, 50)}>
        Reviews
      </Button>
      <Button classes="white" onClick={() => scrollTo(questionsAndAnswersRef, 50)}>
        Q&A
      </Button>
    </div>
  );
};

export default StickyNav;
