import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Slider.css';

const Slider = ({ dots, children }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlideHandler = () => {
    setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : children.length - 1);
  };

  const nextSlideHandler = () => {
    setSlideIndex(slideIndex !== children.length - 1 ? slideIndex + 1 : 0);
  };

  return (
    <div className="slider_container">
      <ul className="slides_list">
        {children.map((slide, index) => (
          <li className={slideIndex === index ? 'slide active' : 'slide'} key={index}>
            {slide}
          </li>
        ))}
      </ul>

      <button className="slider_btn prev" onClick={prevSlideHandler}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider_btn next" onClick={nextSlideHandler}>
        <i className="fas fa-chevron-right"></i>
      </button>
      {dots && (
        <div className="slider_dots">
          {children.map((_, index) => (
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

Slider.Item = function SliderItem({ classes, title, products, itemSubtitleLine, color, image }) {
  return image ? (
    <img src={image} alt={title} />
  ) : (
    <div className={classes} style={{ background: `var(--${color})` }}>
      <div className="title">{title}</div>
      <div className="product_list">
        {products.map((product) => (
          <Link
            to={
              itemSubtitleLine === 'brand'
                ? `/store/${product?.brand}`
                : `/products/${product?.productId}`
            }
          >
            <img src={product?.image} alt={product?.title} />
            <span>
              {itemSubtitleLine === 'discount' && '-'}
              {product?.title && product[itemSubtitleLine]}
              {itemSubtitleLine === 'discount' && '%'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
