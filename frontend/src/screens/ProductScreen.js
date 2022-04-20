import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/ProductScreen.css';
import { listProductDetails, listProductImages } from '../state/actions/productActions';
import { addBrowsingHistoryRecord } from '../state/actions/browsingHistoryActions';

import QuestionsAndAnswers from '../components/QuestionsAndAnswers';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Reviews from '../components/Reviews';
import ComparisonTable from '../components/ComparisonTable';
import ProductSpecifications from '../components/ProductSpecifications';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ProductFeatures from '../components/ProductFeatures';
import Carousel from '../components/Carousel';
import History from '../components/History';
import Divider from '../components/Divider';
import ProductDetails from '../components/ProductDetails';

const ProductScreen = ({ match }) => {
  const productId = match.params.productId;
  const dispatch = useDispatch();

  const [questionsCount, setQuestionsCount] = useState(0);

  const { product, loading, error } = useSelector((state) => state.productDetails);

  const { userInfo: currentUser } = useSelector((state) => state.userLogin);

  const reviewsRef = useRef(null);
  const comparisonRef = useRef(null);
  const questionsAndAnswersRef = useRef(null);
  const featuresRef = useRef(null);
  const specsRef = useRef(null);

  useEffect(() => {
    dispatch(listProductDetails(productId));
    dispatch(listProductImages(productId));
    dispatch(addBrowsingHistoryRecord(productId));
  }, [dispatch, match, productId]);

  return (
    <main className="product_screen_container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <section className="product_details">
          <ProductDetails
            product={product}
            questionsCount={questionsCount}
            comparisonRef={comparisonRef}
            reviewsRef={reviewsRef}
            questionsAndAnswersRef={questionsAndAnswersRef}
            specsRef={specsRef}
            featuresRef={featuresRef}
          />
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
        <Reviews productId={productId} reviewsRef={reviewsRef}/>
      </section>

      <section className="questions_and_answers_container" ref={questionsAndAnswersRef}>
        <Divider>
          <h2>Questions & Answers</h2>
        </Divider>
        <QuestionsAndAnswers
          currentUser={currentUser}
          productId={productId}
          setQuestionsCount={setQuestionsCount}
          isScreen={false}
          questionsAndAnswersRef={questionsAndAnswersRef}
        />
      </section>

      {currentUser?.token && (
        <section className="product_carousel_history">
          <Divider>
            <h2>Your Browsing History</h2>
          </Divider>

          <Carousel isPageVisible={true}>
            <History horizontal={true} />
          </Carousel>
        </section>
      )}

      <ScrollToTopButton />
    </main>
  );
};

export default ProductScreen;
