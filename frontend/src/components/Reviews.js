import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import Button from './Button';
import './styles/Reviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../state/actions/userActions';
import RatingWidget from './RatingWidget';
import { useHistory } from 'react-router-dom';
import {
  defaultEndpoint,
  productListPageSizeOptionsMap,
  ratingFilterOptionsMap,
  reviewsSortOptionsMap
} from '../constants/inputMaps';
import { listReviews } from '../state/actions/reviewActions';
import { listProductDetails } from '../state/actions/productActions';
import HeaderControls from './HeaderControls';
import Loader from './Loader';
import Message from './Message';
import Pagination from './Pagination';

const Reviews = ({ match, productId: productIdProp, isScreen = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = productIdProp || match.params.productId;

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['reviews'],
    pageSize: `pageSize=${isScreen ? 12 : 3}&`
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userDetails);

  const { reviews, loading, error } = useSelector((state) => state.reviewList);

  const { success: successCreate } = useSelector((state) => state.reviewCreate);

  const { success: successDelete } = useSelector((state) => state.reviewDelete);

  const { success: successEdit } = useSelector((state) => state.reviewEdit);

  const {
    product,
    loading: loadingProduct,
    error: errorProduct
  } = useSelector((state) => state.productDetails);

  const hasUserLeftReview =
    reviews?.length && reviews?.some((review) => review.userId === user?.userId);

  const [createMode, setCreateMode] = useState(endpoint?.search === '' && reviews?.length === 0);

  useEffect(() => {
    const { page, pageSize, sort, search, rating } = endpoint;

    dispatch(listReviews(productId, `${page}${pageSize}${sort}${rating}${search}`));
    dispatch(getUserDetails(userInfo?.userId));
    dispatch(listProductDetails(productId));
  }, [dispatch, userInfo?.userId, productId, endpoint, successCreate, successEdit, successDelete]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <div className="reviews">
      <aside className="reviews_sidebar">
        {loadingProduct ? (
          <Loader />
        ) : errorProduct ? (
          <Message type="error">{errorProduct}</Message>
        ) : (
          <div className="sidebar_wrapper">
            <RatingWidget
              product={product}
              updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
              ratingQuery={endpoint.rating}
            />
            {!hasUserLeftReview && !createMode && (
              <Button classes="white rounded" onClick={() => setCreateMode(true)}>
                Leave a review
              </Button>
            )}
          </div>
        )}
      </aside>
      <div className="reviews_list">
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="reviews"
          sortOptionsMap={reviewsSortOptionsMap}
          pageSizeOptionsMap={isScreen && productListPageSizeOptionsMap}
          ratingFilterOptionsMap={ratingFilterOptionsMap}
          isGrayBackground={isScreen}
          breadcrumbsPaths={
            isScreen &&
            product && [
              { label: product?.title, path: `/products/${productId}` },
              { label: 'Reviews', path: '' }
            ]
          }
        />
        <div className="create_form">
          {createMode && (
            <ReviewCard
              createMode={createMode}
              setCreateMode={setCreateMode}
              currentUser={user}
              productId={productId}
              fullName={user.fullName}
              userId={user.userId}
              avatar={user.avatar}
            />
          )}
        </div>
        <ul className="reviews_list_wrapper">
          {reviews?.length > 0 &&
            reviews?.map((review) => {
              return (
                <li key={review.reviewId}>
                  <ReviewCard {...review} currentUser={user} />
                </li>
              );
            })}
        </ul>
        <div className="footer">
          {!isScreen && reviews?.length > 0 && (
            <Button
              classes="text"
              onClick={() =>
                setEndpoint({
                  ...endpoint,
                  pageSize: `${
                    endpoint.pageSize === 'pageSize=3&' ? 'pageSize=13&' : 'pageSize=3&'
                  }`
                })
              }
            >
              {endpoint.pageSize === 'pageSize=3&' ? (
                <>
                  <i className="fa fa-chevron-down" /> See more reviews (10)
                </>
              ) : (
                <>
                  <i className="fa fa-chevron-up" /> Collapse reviews
                </>
              )}
            </Button>
          )}
          {!isScreen && (
            <Button classes="text" onClick={() => history.push(`/reviews/${productId}`)}>
              See all reviews
            </Button>
          )}
          {isScreen && (
            <Pagination
              updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
              currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
              pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
              totalItems={reviews?.[0]?.totalDBItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
