import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProductDetails.css';
import { useResize } from '../hooks/useResize';
import useTypedSelector from '../hooks/useTypedSelector';

import Loader from './Loader';
import Message from './Message';
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductImageGallery from './ProductImageGallery';
import ProductScreenActionBox from './ProductScreenActionBox';
import ProductScreenImageSidebar from './ProductScreenImageSidebar';
import ProductDetailsProps from '../models/components/ProductDetailsProps';

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  questionsCount,
  comparisonRef,
  reviewsRef,
  questionsAndAnswersRef,
  specsRef,
  featuresRef,
  productListAdmin = false
}) => {
  const dispatch = useDispatch();

  const {
    productImages,
    loading: loadingImages,
    error: errorImages
  } = useTypedSelector((state) => state.productImagesList);

  const [selectedImage, setSelectedImage] = useState(
    productImages?.filter((img) => img.isMain === 0)[0].image
  );
  const [zoomBackgroundSize, setZoomBackgroundSize] = useState();
  const [zoomBackgroundPosition, setZoomBackgroundPosition] = useState();

  const zoomedImageRef = useRef(null);
  const zoomedImageRect = useResize(zoomedImageRef);
  const [showZoomedImage, setShowZoomedImage] = useState(false);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [dispatch, product]);

  return (
    <>
      {loadingImages ? (
        <Loader />
      ) : errorImages ? (
        <Message type="error">{errorImages}</Message>
      ) : (
        <div className="product_image_sidebar">
          <ProductScreenImageSidebar
            images={productImages.filter((img) => img.isMain === 0)}
            setSelectedImage={setSelectedImage}
          />
        </div>
      )}
      {loadingImages ? (
        <Loader />
      ) : errorImages ? (
        <Message type="error">{errorImages}</Message>
      ) : (
        <div className="product_details_image">
          <ProductImageGallery
            selectedImage={selectedImage}
            zoomedImageRect={zoomedImageRect}
            setZoomBackgroundSize={setZoomBackgroundSize}
            setZoomBackgroundPosition={setZoomBackgroundPosition}
            setShowZoomedImage={setShowZoomedImage}
          />
        </div>
      )}
      <div
        className="product_details_info"
        ref={zoomedImageRef}
        style={{
          backgroundImage: showZoomedImage ? `url(${selectedImage})` : 'none',
          backgroundSize: `${zoomBackgroundSize}`,
          backgroundPosition: `${zoomBackgroundPosition}`,
          boxShadow: showZoomedImage ? '0 3px 10px rgba(0, 0, 0, 0.3)' : 'none'
        }}
      >
        <ProductDetailsInfo
          showZoomedImage={showZoomedImage}
          product={product}
          questionsCount={questionsCount}
          comparisonRef={comparisonRef}
          reviewsRef={reviewsRef}
          questionsAndAnswersRef={questionsAndAnswersRef}
          specsRef={specsRef}
          featuresRef={featuresRef}
          productListAdmin={productListAdmin}
        />
      </div>
      {!productListAdmin && (
        <div className="product_screen_action_box card">
          <ProductScreenActionBox product={product} />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
