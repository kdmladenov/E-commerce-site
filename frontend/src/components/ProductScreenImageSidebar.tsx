import React from 'react';

import './styles/ProductScreenImageSidebar.css';
import { BASE_URL } from '../constants/constants';
import ProductScreenImageSidebarProps from '../models/components/ProductScreenImageSidebarProps';

const ProductScreenImageSidebar: React.FC<ProductScreenImageSidebarProps> = ({
  images,
  setSelectedImage
}) => {
  return (
    <ul>
      {images?.map((image, index) => (
        <li key={index} onMouseEnter={() => setSelectedImage(image?.image)}>
          <img
            src={image?.image.startsWith('http') ? image?.image : `${BASE_URL}/${image?.image}`}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductScreenImageSidebar;
