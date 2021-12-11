import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './styles/ReviewsScreen.css';
import Breadcrumbs from '../components/Breadcrumbs';
import DropdownSelect from '../components/DropdownSelect';
import { listReviews } from '../actions/reviewActions';
import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import {
  browsingHistorySidebarInput,
  productListPageSizeOptionsMap,
  ratingFilterOptionsMap,
  reviewsSortOptionsMap
} from '../constants/inputMaps';
import Pagination from '../components/Pagination';
import ReviewCard from '../components/Review/ReviewCard';
import Sidebar from '../components/Sidebar';
import RatingWidget from '../components/RatingWidget';

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
          {reviews && <RatingWidget reviews={reviews} productId={productId} />}
        </aside>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : reviews.length === 0 ? (
          <h2>No reviews to display</h2>
        ) : (
          <div className="reviews_screen">
            <div className="header">
              <div className="breadcrumbs_container">
                <Breadcrumbs />
              </div>
              <SearchBox
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                resource="reviews"
              />
              <div className="dropdown_group_container">
                <DropdownSelect
                  name="rating"
                  updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                  query={endpoint}
                  labelStart="Rating: "
                  optionsMap={ratingFilterOptionsMap}
                />
                <DropdownSelect
                  name="pageSize"
                  updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                  query={endpoint}
                  labelStart="Page size"
                  optionsMap={productListPageSizeOptionsMap}
                />
                <DropdownSelect
                  name="sort"
                  updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                  query={endpoint}
                  labelStart="Sort by"
                  optionsMap={reviewsSortOptionsMap}
                />
              </div>
            </div>
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
