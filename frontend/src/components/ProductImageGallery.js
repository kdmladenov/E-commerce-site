import React, { useRef, useState } from 'react';
import { useResize } from '../hooks/useResize';
import './styles/ProductImageGallery.css';

const ZOOM_RATIO = 1 / 3;

const ProductImageGallery = ({
  images,
  selectedImage,
  setSelectedImage,
  zoomedImageRect,
  setZoomBackgroundSize,
  setZoomBackgroundPosition,
  setShowZoomedImage
}) => {
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const lensRef = useRef(null);

  const imageContainerRect = useResize(imageContainerRef);
  const imageRect = useResize(imageRef);
  const lensRect = useResize(lensRef);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);

  const onMouseEnterHandler = () => {
    setShowZoomedImage(true);
    setShowLens(true);
  };

  const onMouseLeaveHandler = () => {
    setShowZoomedImage(false);
    setShowLens(false);
  };

  const onMouseMoveHandler = (e) => {
    let x = e.clientX - imageContainerRect.left - lensRect.width / 2;
    let y = e.clientY - imageContainerRect.top - lensRect.height / 2;

    const minX = 0;
    const minY = 0;
    const maxX = imageContainerRect.width - lensRect.width;
    const maxY = imageContainerRect.height - lensRect.height;

    x = x <= minX ? minX : x >= maxX ? maxX : x;
    y = y <= minY ? minY : y >= maxY ? maxY : y;

    let fx = zoomedImageRect.width / lensRect.width;
    let fy = zoomedImageRect.height / lensRect.height;

    setZoomBackgroundSize(`${imageRect.width * fx}px ${imageRect.height * fy}px`);
    setZoomBackgroundPosition(`-${x * fx}px -${y * fy}px`);
    setMousePosition({ x, y });
  };

  const imagesSideBarToRender = images.map((image) => (
    <li key={image} onMouseEnter={() => setSelectedImage(image)}>
      <img src={image} alt="" />
    </li>
  ));

  return (
    <div className="gallery_container">
      <ul>{imagesSideBarToRender}</ul>
      <div
        className="selected_image"
        ref={imageContainerRef}
        onMouseMove={onMouseMoveHandler}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <img src={selectedImage} alt="" ref={imageRef} />
        <div
          className="lens"
          ref={lensRef}
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            width: `${imageContainerRect.width * ZOOM_RATIO}px`,
            height: `${imageContainerRect.height * ZOOM_RATIO}px`,
            background: showLens ? 'rgba(214, 214, 214, 0.4)' : 'none',
            border: showLens ? '1px solid rgb(75, 75, 75)' : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
