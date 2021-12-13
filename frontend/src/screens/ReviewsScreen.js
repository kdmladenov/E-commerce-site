import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './styles/ReviewsScreen.css';
import { listReviews } from '../actions/reviewActions';
import { useState } from 'react';
import {
  productListPageSizeOptionsMap,
  ratingFilterOptionsMap,
  reviewsSortOptionsMap
} from '../constants/inputMaps';
import Pagination from '../components/Pagination';
import ReviewCard from '../components/ReviewCard';
import RatingWidget from '../components/RatingWidget';
import { listProductDetails } from '../actions/productActions';
import HeaderControls from '../components/HeaderControls';

const ReviewsScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productId = match.params.productId;

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=dateCreated desc&',
    rating: 'ratingMin=1&ratingMax=5&',
    search: ''
  });

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading: loadingProduct, error: errorProduct } = productDetails;
  // To refresh on every change in reviews
  const reviewList = useSelector((state) => state.reviewList);
  const { reviews, loading, error } = reviewList;

  // const reviewCreate = useSelector((state) => state.reviewCreate);
  // const { success: successCreate, error: errorCreate } = reviewCreate;

  // const reviewDelete = useSelector((state) => state.reviewDelete);
  // const { success: successDelete, error: errorDelete } = reviewDelete;

  // const reviewEdit = useSelector((state) => state.reviewEdit);
  // const { success: successEdit, error: errorEdit } = reviewEdit;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reviewsToShow =
    reviews?.length &&
    reviews?.map((review) => (
      <li key={review.reviewId}>
        <ReviewCard
          {...review}
          currentUser={userInfo}
          // createMode={false}
          // setCreateMode={setCreateMode}
        />
      </li>
    ));

  useEffect(() => {
    const { page, pageSize, sort, search, rating } = endpoint;

    dispatch(listReviews(productId, `${page}${pageSize}${sort}${rating}${search}`));
    dispatch(listProductDetails(productId));
  }, [
    dispatch,
    productId,
    endpoint
    // successCreateReview, successDeleteReview, successEditReview
  ]);

  return (
    Array.isArray(reviews) && (
      <main className="reviews_screen_container">
        <aside className="sidebar">
          {reviews && (
            <RatingWidget
              product={product}
              updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
              ratingQuery={endpoint.rating}
            />
          )}
        </aside>
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="reviews"
          pageSizeOptionsMap={productListPageSizeOptionsMap}
          sortOptionsMap={reviewsSortOptionsMap}
          ratingFilterOptionsMap={ratingFilterOptionsMap}
          isGrayBackground={true}
        />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : reviews.length === 0 ? (
          <h2>No reviews to display</h2>
        ) : (
          <div className="reviews_list">
            <ul>{reviewsToShow}</ul>
            <div className="footer">
              {reviews?.length > 0 && (
                <Pagination
                  updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                  currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                  pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                  totalItems={reviews[0].totalDBItems}
                />
              )}
            </div>
          </div>
        )}
      </main>
    )
  );
};

export default ReviewsScreen;
