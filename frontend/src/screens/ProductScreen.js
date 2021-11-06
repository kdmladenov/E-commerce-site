import React, { useEffect, useRef, useState } from 'react';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import './styles/ProductScreen.css';
import { listProductDetails, listProductFeatures, listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { BASE_URL, MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';
import ProductImageGallery from '../components/ProductImageGallery';
import { useResize } from '../hooks/useResize';
import Button from '../components/Button';
import ReviewList from '../components/Review/ReviewList';
import { listReviews } from '../actions/reviewActions';
import { addBrowsingHistoryRecord } from '../actions/browsingHistoryActions';
import { listQuestionsAndAnswers } from '../actions/questionsAndAnswersActions';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers/QuestionsAndAnswers';
import ComparisonTable from '../components/ComparisonTable';
import Accordion from '../components/Accordion';
import ProductSpecifications from '../components/ProductSpecifications';
import Divider from '../components/Divider';

// TO DO to fix aspect ratio of the zoomed image
const ProductScreen = ({ history, match }) => {
  const zoomedImageRef = useRef(null);
  const zoomedImageRect = useResize(zoomedImageRef);
  const [showZoomedImage, setShowZoomedImage] = useState(false);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productFeaturesList = useSelector((state) => state.productFeaturesList);
  const { productFeatures, loading: loadingFeatures, error: errorFeatures } = productFeaturesList;

  // To refresh on every change in reviews
  const reviewList = useSelector((state) => state.reviewList);
  const { reviews, loading: loadingReviews, error: errorReviews } = reviewList;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { success: successCreateReview, error: errorCreateReview } = reviewCreate;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success: successDeleteReview, error: errorDeleteReview } = reviewDelete;

  const reviewEdit = useSelector((state) => state.reviewEdit);
  const { success: successEditReview, error: errorEditReview } = reviewEdit;

  const productlist = useSelector((state) => state.productList);
  const {
    loading: loadingCompared,
    products: productsCompared,
    error: errorCompared
  } = productlist;

  const questionsAndAnswersList = useSelector((state) => state.questionsAndAnswersList);
  const {
    questions: questionsAndAnswers,
    loading: loadingQuestionsAndAnswers,
    error: errorQuestionsAndAnswers
  } = questionsAndAnswersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: currentUser } = userLogin;

  //TO DO to be replaced with backend data
  const images = [
    product.image,
    'https://m.media-amazon.com/images/I/718BI2k4-KL._AC_UY436_FMwebp_QL65_.jpg'
    // 'https://images-na.ssl-images-amazon.com/images/I/51aOzD8GuxL.jpg',
    // 'https://images-na.ssl-images-amazon.com/images/I/31PEdbmQZsL.jpg',
    // 'https://images-na.ssl-images-amazon.com/images/I/41O4rjSlneL.jpg',
    // 'https://images-na.ssl-images-amazon.com/images/I/41B54aFFMOL.jpg',
    // 'https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg',
    // 'https://m.media-amazon.com/images/I/71A1RJumI9L._AC_UL640_FMwebp_QL65_.jpg',
    // 'https://m.media-amazon.com/images/I/41pfjdq+QFS._AC_UL640_FMwebp_QL65_.jpg',
    // 'https://m.media-amazon.com/images/I/71aVUqJuklL._AC_UL640_FMwebp_QL65_.jpg',
    // 'https://m.media-amazon.com/images/I/71PNX2zRTpS._AC_UL640_FMwebp_QL65_.jpg',
    // 'https://m.media-amazon.com/images/I/71ikXkzAY8L._AC_UL640_FMwebp_QL65_.jpg',
    // 'https://m.media-amazon.com/images/I/71gtHnQGfQL._AC_UL640_FMwebp_QL65_.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomBackgroundSize, setZoomBackgroundSize] = useState();
  const [zoomBackgroundPosition, setZoomBackgroundPosition] = useState();

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const imagesSideBarToRender = images.map((image, index) => (
    <li key={index} onMouseEnter={() => setSelectedImage(image)}>
      <img src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`} alt="" />
    </li>
  ));

  // Go to reviews section
  const reviewsRef = useRef(null);
  const gotoReviews = () => {
    window.scrollTo({
      top: reviewsRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // Go to comparison section
  const comparisonRef = useRef(null);
  const gotoComparison = () => {
    window.scrollTo({
      top: comparisonRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // Go to Q&A section
  const questionsAndAnswersRef = useRef(null);
  const gotoQuestionsAndAnswers = () => {
    window.scrollTo({
      top: questionsAndAnswersRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  console.log(questionsAndAnswers?.length, 'questionsAndAnswers');

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    dispatch(listProductFeatures(match.params.id));
    dispatch(listReviews(match.params.id));
    dispatch(listQuestionsAndAnswers(match.params.id));
    dispatch(addBrowsingHistoryRecord(match.params.id));
  }, [dispatch, match, successCreateReview, successDeleteReview, successEditReview]);

  useEffect(() => {
    setSelectedImage(product.image);
    dispatch(listProducts(`?searchBy=brand&search=${product.brand}`));
  }, [dispatch, product]);

  return (
    <main className="product_screen_container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <section className="product_details">
          <ul className="product_image_sidebar">{imagesSideBarToRender}</ul>
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
                <div className="product_details_title">{product.title}</div>
                <div className="product_details_brand">
                  <span>by</span>
                  <Button types="text">
                    <strong onClick={gotoComparison}>{product.brand}</strong>
                  </Button>
                </div>
                <span className="product_details_rating">
                  <Rating rating={product.rating} color="orange"></Rating>
                  <Button types="text" onClick={gotoReviews}>
                    {`from ${product.reviewCount} customer reviews `}
                  </Button>
                </span>
                <span className="product_details_questions">
                  <Button types="text" onClick={gotoQuestionsAndAnswers}>
                    {` ${questionsAndAnswers?.length} answered questions`}
                  </Button>
                </span>
                <Divider />
                <div className="features">
                  Main features: <p>{product.description}</p>
                </div>
                <Divider />
                <div className="product_details_description">
                  Description: <p>{product.description}</p>
                </div>
              </div>
            )}
          </div>
          <div className="product_details_action_box card">
            <ul>
              <li>
                <h2>Price</h2>
                <h2>${product.price}</h2>
              </li>
              <li>
                <h2>Status</h2>
                <h2 style={{ color: product.stockCount === 0 ? 'red' : 'green' }}>
                  {product.stockCount === 0 ? 'Out of Stock' : 'In Stock'}
                </h2>
              </li>
              <li>
                {product.stockCount > 0 && (
                  <>
                    <h2>Quantity </h2>
                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                      {[...Array(product.stockCount).keys()]
                        .slice(0, Math.min(product.stockCount, MAX_PRODUCT_QTY_FOR_PURCHASE))
                        .map((index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </>
                )}
              </li>
            </ul>

            <Button onClick={addToCartHandler} disabled={product.stockCount === 0} className="btn">
              {product.stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </section>
      )}
      {productFeatures?.length && (
        <section className="product_features">
          <h2>Product Features:</h2>
          {loadingFeatures ? (
            <Loader />
          ) : errorFeatures ? (
            <Message type="error">{errorFeatures}</Message>
          ) : productFeatures?.length > 0 ? (
            <Accordion>
              {productFeatures?.map((feature) => (
                <Accordion.Item>
                  <Accordion.Header>
                    <Accordion.Title>{feature.featureTitle}</Accordion.Title>
                    <Accordion.ButtonGroup></Accordion.ButtonGroup>
                  </Accordion.Header>
                  <Accordion.Body>{feature.featureContent}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <Message type="success">Ask Question Box</Message>
          )}
        </section>
      )}
      <section className="product_specifications">
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
        <h2>{`Compare ${product.brand} Laptops:`}</h2>
        {loadingCompared ? (
          <Loader />
        ) : errorCompared ? (
          <Message type="error">{errorCompared}</Message>
        ) : (
          <ComparisonTable products={productsCompared} currentProductId={+match.params.id} />
        )}
      </section>
      <section className="reviews_container" ref={reviewsRef}>
        <h2>Reviews:</h2>
        {loadingReviews ? (
          <Loader />
        ) : errorReviews || errorCreateReview || errorDeleteReview || errorEditReview ? (
          <Message type="error">
            {errorReviews || errorCreateReview || errorDeleteReview || errorEditReview}
          </Message>
        ) : product.reviewCount > 0 ? (
          <ReviewList reviews={reviews} currentUser={currentUser} productId={product.productId} />
        ) : (
          <Message type="success">There are no reviews for this product</Message>
        )}
      </section>
      <section className="questions_and_answers_container" ref={questionsAndAnswersRef}>
        <h2>Questions & Answers:</h2>
        {loadingQuestionsAndAnswers ? (
          <Loader />
        ) : errorQuestionsAndAnswers ? (
          <Message type="error">{errorQuestionsAndAnswers}</Message>
        ) : questionsAndAnswers?.length > 0 ? (
          <QuestionsAndAnswers
            questionsAndAnswers={questionsAndAnswers}
            currentUser={currentUser}
            productId={match.params.id}
          />
        ) : (
          <Message type="success">Ask Question Box</Message>
        )}
      </section>
    </main>
  );
};

export default ProductScreen;
