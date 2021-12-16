import React from 'react';
import './styles/ProductScreenImageSidebar.css';
import { BASE_URL } from '../constants/constants';



const ProductScreenImageSidebar = ({ images, setSelectedImage }) => {
 
  return (
    <ul>
      {images.map((image, index) => (
        <li key={index} onMouseEnter={() => setSelectedImage(image)}>
          <img src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default ProductScreenImageSidebar;
