import React, { useRef, useState } from 'react';
import { BASE_URL } from '../constants/constants';
import { useResize } from '../hooks/useResize';
import Modal from './Modal';
import './styles/ProductImageGallery.css';

const ZOOM_RATIO = 0.3;

const ProductImageGallery = ({
  selectedImage,
  zoomedImageRect,
  setZoomBackgroundSize,
  setZoomBackgroundPosition,
  setShowZoomedImage
}) => {
  const [openImageModal, setOpenImageModal] = useState(false);

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

    setZoomBackgroundSize(`${imageRect.width / ZOOM_RATIO}px ${imageRect.height / ZOOM_RATIO}px`);
    setZoomBackgroundPosition(`-${x / ZOOM_RATIO}px -${y / ZOOM_RATIO}px`);
    setMousePosition({ x, y });
  };

  return (
    <div className="gallery_container" ref={imageContainerRef}>
      <div
        className="selected_image"
        onMouseMove={onMouseMoveHandler}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {selectedImage?.length && (
          <img
            src={selectedImage?.startsWith('http') ? selectedImage : `${BASE_URL}/${selectedImage}`}
            alt=""
            ref={imageRef}
          />
        )}
        <div
          className="lens"
          ref={lensRef}
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            width: `${zoomedImageRect.width * ZOOM_RATIO}px`,
            height: `${zoomedImageRect.height * ZOOM_RATIO}px`,
            background: showLens ? 'rgba(214, 214, 214, 0.4)' : 'none',
            border: showLens ? '1px solid rgb(75, 75, 75)' : 'none'
          }}
          onClick={() => setOpenImageModal(true)}
        />
      </div>

      {openImageModal && (
        <Modal setIsOpenModal={setOpenImageModal}>
          <img
            src={selectedImage?.startsWith('http') ? selectedImage : `${BASE_URL}/${selectedImage}`}
            alt=""
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductImageGallery;
