import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import Button from './Button';
import './styles/Reviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import RatingWidget from './RatingWidget';
import Tooltip from './Tooltip';
import { useHistory } from 'react-router-dom';
import { ratingFilterOptionsMap, reviewsSortOptionsMap } from '../constants/inputMaps';
import { listReviews } from '../actions/reviewActions';
import { listProductDetails } from '../actions/productActions';
import HeaderControls from './HeaderControls';

const Reviews = ({ currentUser, productId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [createMode, setCreateMode] = useState(false);

  const [endpoint, setEndpoint] = useState({
    page: 'page=1&',
    pageSize: 'pageSize=3&',
    sort: 'sort=dateCreated desc&',
    rating: 'ratingMin=1&ratingMax=5&',
    search: ''
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews, loading, error } = reviewList;

  // const reviewCreate = useSelector((state) => state.reviewCreate);
  // const { success: successCreate, error: errorCreate } = reviewCreate;

  // const reviewDelete = useSelector((state) => state.reviewDelete);
  // const { success: successDelete, error: errorDelete } = reviewDelete;

  // const reviewEdit = useSelector((state) => state.reviewEdit);g
  // const { success: successEdit, error: errorEdit } = reviewEdit;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading: loadingProduct, error: errorProduct } = productDetails;

  const hasUserLeftReview =
    reviews?.length && reviews?.some((review) => review.userId === currentUser?.userId);

  const handleOpenCreateForm = () => {
    setCreateMode(true);
  };

  useEffect(() => {
    dispatch(listReviews(productId));
  }, []);

  useEffect(() => {
    const { page, pageSize, sort, search, rating } = endpoint;

    dispatch(listReviews(productId, `${page}${pageSize}${sort}${rating}${search}`));
    dispatch(getUserDetails(currentUser?.userId));
    dispatch(listProductDetails(productId));
  }, [
    dispatch,
    currentUser?.userId,
    productId,
    endpoint
    // successCreateReview, successDeleteReview, successEditReview
  ]);

  return (
    <div className="reviews">
      <div className="reviews_sidebar">
        {product && (
          <RatingWidget
            product={product}
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            ratingQuery={endpoint.rating}
          />
        )}
      </div>
      <div className="reviews-list">
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="reviews"
          sortOptionsMap={reviewsSortOptionsMap}
          ratingFilterOptionsMap={ratingFilterOptionsMap}
          isBreadcrumbsVisible={false}
        />
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
        <ul>
          {!hasUserLeftReview && !createMode && (
            <li>
              <Button onClick={handleOpenCreateForm}>
                <Tooltip text="Write Review">To replace with input field. No create mode</Tooltip>
              </Button>
            </li>
          )}
          {reviews?.length > 0 &&
            reviews?.map((review) => {
              return (
                <li key={review.reviewId}>
                  <ReviewCard
                    {...review}
                    currentUser={currentUser}
                    createMode={false}
                    setCreateMode={setCreateMode}
                  />
                </li>
              );
            })}
        </ul>
        <div className="footer">
          {reviews?.length > 0 &&
            (endpoint.pageSize === 'pageSize=3&' ? (
              <Button
                classes="text"
                onClick={() =>
                  setEndpoint({
                    ...endpoint,
                    pageSize: 'pageSize=13&'
                  })
                }
              >
                <i className="fa fa-chevron-down"></i> See more reviews (10)
              </Button>
            ) : (
              <Button
                classes="text"
                onClick={() =>
                  setEndpoint({
                    ...endpoint,
                    pageSize: 'pageSize=3&'
                  })
                }
              >
                <i className="fa fa-chevron-up"></i> Collapse reviews
              </Button>
            ))}
          <Button classes="text" onClick={() => history.push(`/reviews/${productId}`)}>
            See all reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
