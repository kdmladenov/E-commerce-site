import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResize } from '../hooks/useResize';
import Loader from './Loader';
import Message from './Message';
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductImageGallery from './ProductImageGallery';
import ProductScreenActionBox from './ProductScreenActionBox';
import ProductScreenImageSidebar from './ProductScreenImageSidebar';
import './styles/ProductDetails.css';

const ProductDetails = ({
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
  //TO DO to be replaced with backend data
  const images = [
    product?.image,
    'https://m.media-amazon.com/images/I/718BI2k4-KL._AC_UY436_FMwebp_QL65_.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomBackgroundSize, setZoomBackgroundSize] = useState();
  const [zoomBackgroundPosition, setZoomBackgroundPosition] = useState();

  const zoomedImageRef = useRef(null);
  const zoomedImageRect = useResize(zoomedImageRef);
  const [showZoomedImage, setShowZoomedImage] = useState(false);

  const productImagesList = useSelector((state) => state.productImagesList);
  const { productImages, loading: loadingImages, error: errorImages } = productImagesList;

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [dispatch, product]);

  return (
    <>
      <div className="product_image_sidebar">
        <ProductScreenImageSidebar images={productImages} setSelectedImage={setSelectedImage} />
      </div>
      <div className="product_details_image">
        {loadingImages ? (
          <Loader />
        ) : errorImages ? (
          <Message type="error">{errorImages}</Message>
        ) : (
          <ProductImageGallery
            selectedImage={selectedImage}
            zoomedImageRect={zoomedImageRect}
            setZoomBackgroundSize={setZoomBackgroundSize}
            setZoomBackgroundPosition={setZoomBackgroundPosition}
            setShowZoomedImage={setShowZoomedImage}
          />
        )}
      </div>
      <div
        className="product_details_info"
        ref={zoomedImageRef}
        style={{
          backgroundImage: showZoomedImage ? `url(${selectedImage})` : 'none',
          backgroundSize: `${zoomBackgroundSize}`,
          backgroundPosition: `${zoomBackgroundPosition}`,
          boxShadow: showZoomedImage && '0 3px 10px rgba(0, 0, 0, 0.3)'
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
