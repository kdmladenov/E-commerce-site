import React, { useEffect, useRef, useState } from 'react';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import './styles/ProductScreen.css';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { BASE_URL } from '../constants/constants';
import ProductImageGallery from '../components/ProductImageGallery';
import { useResize } from '../hooks/useResize';
import Button from '../components/Button';
import Reviews from '../components/Reviews';
import { addBrowsingHistoryRecord } from '../actions/browsingHistoryActions';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers/QuestionsAndAnswers';
import ComparisonTable from '../components/ComparisonTable';
import ProductSpecifications from '../components/ProductSpecifications';
import Divider from '../components/Divider';
import { scrollTo } from '../constants/utility-functions';
import ScrollToTopButton from '../components/ScrollToTopButton';
import RatingWidget from '../components/RatingWidget';
import Popover from '../components/Popover';
import ProductFeaturesMain from '../components/ProductFeaturesMain';
import ProductFeatures from '../components/ProductFeatures';
import ProductSpecificationsMain from '../components/ProductSpecificationsMain';
import ProductScreenActionBox from '../components/ProductScreenActionBox';

// TO DO to fix aspect ratio of the zoomed image
const ProductScreen = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [questionsCount, setQuestionsCount] = useState(0);

  const reviewsRef = useRef(null);
  const comparisonRef = useRef(null);
  const questionsAndAnswersRef = useRef(null);
  const featuresRef = useRef(null);
  const specsRef = useRef(null);

  const zoomedImageRef = useRef(null);
  const zoomedImageRect = useResize(zoomedImageRef);
  const [showZoomedImage, setShowZoomedImage] = useState(false);

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

  const imagesSideBarToRender = images.map((image, index) => (
    <li key={index} onMouseEnter={() => setSelectedImage(image)}>
      <img src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`} alt="" />
    </li>
  ));

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
            <ul>{imagesSideBarToRender}</ul>
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
            {!showZoomedImage && (
              <div className="product_details_info">
                <div className="product_details_title">{product?.title}</div>
                <div className="product_details_brand">
                  <span>by</span>
                  <Button classes="text">
                    <strong onClick={() => scrollTo(comparisonRef)}>{product?.brand}</strong>
                  </Button>
                </div>
                <div className="product_details_rating" onClick={() => scrollTo(reviewsRef)}>
                  <Popover header={<Rating rating={product?.rating} color="orange"></Rating>}>
                    {product && <RatingWidget product={product} />}
                  </Popover>
                  {product?.reviewCount > 0 ? (
                    <Button classes="text" onClick={() => scrollTo(reviewsRef)}>
                      {`from ${product?.reviewCount} customer reviews `}
                    </Button>
                  ) : (
                    <span>no reviews yet</span>
                  )}
                </div>
                {questionsCount && (
                  <span className="product_details_questions">
                    <Button classes="text" onClick={() => scrollTo(questionsAndAnswersRef)}>
                      {` ${questionsCount} answered questions`}
                    </Button>
                  </span>
                )}
                <Divider />
                <div className="product_details_specifications">
                  <h3>Main specs:</h3>
                  <ProductSpecificationsMain product={product} specsRef={specsRef} />
                </div>
                <Divider />
                <div className="product_features_main">
                  <h3>Main features:</h3>
                  <ProductFeaturesMain featuresRef={featuresRef} productId={productId} />
                </div>
                <Divider />
                <div className="product_description">
                  <h3>Description:</h3> <p>{product?.description}</p>
                </div>
              </div>
            )}
          </div>
          <ProductScreenActionBox product={product} />
        </section>
      )}
      <section className="product_features" ref={featuresRef}>
        <h2>Product Features:</h2>
        <ProductFeatures productId={productId} />
      </section>
      <section className="product_specifications" ref={specsRef}>
        <h2>Product Specifications</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <ProductSpecifications product={product} />
        )}
      </section>

      <section className="comparison_table_container" ref={comparisonRef}>
        <h2>{`Compare ${product?.brand} Laptops:`}</h2>
        <ComparisonTable currentProductId={+productId} brand={product?.brand} />
      </section>

      <section className="reviews_container" ref={reviewsRef}>
        <h2>Reviews:</h2>
        <Reviews currentUser={currentUser} productId={productId} />
      </section>

      <section className="questions_and_answers_container" ref={questionsAndAnswersRef}>
        <h2>Questions & Answers:</h2>
        <QuestionsAndAnswers
          currentUser={currentUser}
          productId={productId}
          setQuestionsCount={setQuestionsCount}
        />
      </section>

      <ScrollToTopButton />
    </main>
  );
};

export default ProductScreen;
