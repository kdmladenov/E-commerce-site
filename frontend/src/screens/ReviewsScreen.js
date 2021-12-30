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
import Button from '../components/Button';
import { getUserDetails } from '../actions/userActions';

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

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews, loading, error } = reviewList;

  const [createMode, setCreateMode] = useState(endpoint?.search === '' && reviews?.length === 0);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { success: successCreate } = reviewCreate;

  const reviewEdit = useSelector((state) => state.reviewEdit);
  const { success: successEdit } = reviewEdit;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success: successDelete } = reviewDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: currentUser } = userLogin;

  const hasUserLeftReview =
    reviews?.length && reviews?.some((review) => review.userId === currentUser?.userId);

  const reviewsToShow =
    reviews?.length &&
    reviews?.map((review) => (
      <li key={review.reviewId}>
        <ReviewCard {...review} currentUser={currentUser} />
      </li>
    ));

  useEffect(() => {
    const { page, pageSize, sort, search, rating } = endpoint;

    dispatch(listReviews(productId, `${page}${pageSize}${sort}${rating}${search}`));
    dispatch(getUserDetails(currentUser?.userId));
    dispatch(listProductDetails(productId));
  }, [
    dispatch,
    productId,
    currentUser?.userId,
    endpoint,
    successCreate,
    successEdit,
    successDelete
  ]);

  return (
    <main className="reviews_screen_container">
      <aside className="sidebar">
        {loadingProduct ? (
          <Loader />
        ) : errorProduct ? (
          <Message type="error">{errorProduct}</Message>
        ) : (
          <div className="sidebar_wrapper">
            {reviews && (
              <RatingWidget
                product={product}
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                ratingQuery={endpoint.rating}
              />
            )}
            {!hasUserLeftReview && !createMode && (
              <Button classes="white rounded" onClick={() => setCreateMode(true)}>
                Leave a review
              </Button>
            )}
          </div>
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
      <div className="create_form">
        {createMode && (
          <ReviewCard
            createMode={createMode}
            setCreateMode={setCreateMode}
            currentUser={currentUser}
            productId={productId}
            fullName={user.fullName}
            userId={user.userId}
            avatar={user.avatar}
          />
        )}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : reviews.length > 0 ? (
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
      ) : (
        <h2>No reviews to show</h2>
      )}
    </main>
  );
};

export default ReviewsScreen;
