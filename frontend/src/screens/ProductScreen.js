import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/ProductScreen.css';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductImageGallery from '../components/ProductImageGallery';
import { useResize } from '../hooks/useResize';
import Reviews from '../components/Reviews';
import { addBrowsingHistoryRecord } from '../actions/browsingHistoryActions';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers/QuestionsAndAnswers';
import ComparisonTable from '../components/ComparisonTable';
import ProductSpecifications from '../components/ProductSpecifications';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ProductFeatures from '../components/ProductFeatures';
import ProductScreenActionBox from '../components/ProductScreenActionBox';
import ProductScreenDetails from '../components/ProductScreenDetails';
import Carousel from '../components/Carousel';
import History from '../components/History';
import ProductScreenImageSidebar from '../components/ProductScreenImageSidebar';
import Divider from '../components/Divider';

// TO DO to fix aspect ratio of the zoomed image
const ProductScreen = ({ match }) => {
  const productId = match.params.productId;
  const dispatch = useDispatch();

  const [questionsCount, setQuestionsCount] = useState(0);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: currentUser } = userLogin;

  //TO DO to be replaced with backend data
  const images = [
    product?.image,
    'https://m.media-amazon.com/images/I/718BI2k4-KL._AC_UY436_FMwebp_QL65_.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomBackgroundSize, setZoomBackgroundSize] = useState();
  const [zoomBackgroundPosition, setZoomBackgroundPosition] = useState();

  const reviewsRef = useRef(null);
  const comparisonRef = useRef(null);
  const questionsAndAnswersRef = useRef(null);
  const featuresRef = useRef(null);
  const specsRef = useRef(null);

  const zoomedImageRef = useRef(null);
  const zoomedImageRect = useResize(zoomedImageRef);
  const [showZoomedImage, setShowZoomedImage] = useState(false);

  useEffect(() => {
    dispatch(listProductDetails(productId));
    dispatch(addBrowsingHistoryRecord(productId));
  }, [dispatch, match, productId]);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [dispatch, product]);

  return (
    <main className="product_screen_container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <section className="product_details">
          <div className="product_image_sidebar">
            <ProductScreenImageSidebar images={images} setSelectedImage={setSelectedImage} />
          </div>
          <div className="product_details_image">
            <ProductImageGallery
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              zoomedImageRect={zoomedImageRect}
              setZoomBackgroundSize={setZoomBackgroundSize}
              setZoomBackgroundPosition={setZoomBackgroundPosition}
              setShowZoomedImage={setShowZoomedImage}
            />
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
            <ProductScreenDetails
              showZoomedImage={showZoomedImage}
              product={product}
              questionsCount={questionsCount}
              comparisonRef={comparisonRef}
              reviewsRef={reviewsRef}
              questionsAndAnswersRef={questionsAndAnswersRef}
              specsRef={specsRef}
              featuresRef={featuresRef}
            />
          </div>
          <div className="product_screen_action_box card">
            <ProductScreenActionBox product={product} />
          </div>
        </section>
      )}
      <section className="product_features" ref={featuresRef}>
        <Divider>
          <h2>Product Features</h2>
        </Divider>
        <ProductFeatures productId={productId} />
      </section>
      <section className="product_specifications" ref={specsRef}>
        <Divider>
          <h2>Product Specifications</h2>
        </Divider>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <ProductSpecifications product={product} />
        )}
      </section>

      <section className="comparison_table_container" ref={comparisonRef}>
        <Divider>
          <h2>{`Compare ${product?.brand} Laptops`}</h2>
        </Divider>

        <ComparisonTable currentProductId={+productId} brand={product?.brand} />
      </section>

      <section className="reviews_container" ref={reviewsRef}>
        <Divider>
          <h2>Customer Reviews</h2>
        </Divider>
        <Reviews currentUser={currentUser} productId={productId} />
      </section>

      <section className="questions_and_answers_container" ref={questionsAndAnswersRef}>
        <Divider>
          <h2>Questions & Answers</h2>
        </Divider>
        <QuestionsAndAnswers
          currentUser={currentUser}
          productId={productId}
          setQuestionsCount={setQuestionsCount}
        />
      </section>
      <section>
        <Divider>
          <h2>Your Browsing History</h2>
        </Divider>
        <div className="product_carousel_history">
          <Carousel isPageVisible={true}>
            <History horizontal={true} />
          </Carousel>
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
};

export default ProductScreen;
