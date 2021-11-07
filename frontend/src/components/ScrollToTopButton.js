import React, { useState } from 'react';
// import Button from './Button'
import './styles/ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [topOfPage, setTopOfPage] = useState(true);

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    setTopOfPage(
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? false : true
    );
  };

  const scrollToTop = () => {
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll_to_top_btn ${!topOfPage && 'top'}`} onClick={scrollToTop}>
      <i class="fa fa-arrow-circle-up"></i>
    </div>
  );
};

export default ScrollToTopButton;