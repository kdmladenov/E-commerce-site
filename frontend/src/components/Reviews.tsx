import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './styles/Reviews.css';
import { getUserDetails } from '../state/actions/userActions';
import { listReviews } from '../state/actions/reviewActions';
import { listProductDetails } from '../state/actions/productActions';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { reviewsSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import { productListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import ratingFilterOptionsMap from '../inputs/ratingFilterOptionsMap';
import useTypedSelector from '../hooks/useTypedSelector';

import RatingWidget from './RatingWidget';
import ReviewCard from './ReviewCard';
import Button from './Button';
import HeaderControls from './HeaderControls';
import Loader from './Loader';
import Message from './Message';
import Pagination from './Pagination';
import scrollTo from '../helpers/scrollTo';
import ReviewsProps from '../models/components/ReviewsProps';

const Reviews: React.FC<ReviewsProps> = ({
  match,
  productId: productIdProp,
  isScreen = false,
  reviewsRef
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = productIdProp || match.params.productId;

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['reviews'],
    pageSize: `pageSize=${isScreen ? 12 : 3}&`
  });

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { user } = useTypedSelector((state) => state.userDetails);

  const { reviews, loading, error } = useTypedSelector((state) => state.reviewList);

  const { success: successCreate } = useTypedSelector((state) => state.reviewCreate);

  const { success: successDelete } = useTypedSelector((state) => state.reviewDelete);

  const { success: successEdit } = useTypedSelector((state) => state.reviewEdit);

  const {
    product,
    loading: loadingProduct,
    error: errorProduct
  } = useTypedSelector((state) => state.productDetails);

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
            {reviews?.length > 0 && (
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
      <div className="reviews_list">
        {reviews?.length > 0 && (
          <HeaderControls
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            resource="reviews"
            sortOptionsMap={reviewsSortOptionsMap}
            pageSizeOptionsMap={isScreen ? productListPageSizeOptionsMap : undefined}
            ratingFilterOptionsMap={ratingFilterOptionsMap}
            isGrayBackground={isScreen}
            breadcrumbsPaths={
              isScreen && product
                ? [
                    { label: product?.title, path: `/products/${productId}` },
                    { label: 'Reviews', path: '' }
                  ]
                : []
            }
          />
        )}
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
          {reviews?.length > 0 ? (
            reviews?.map((review) => {
              return (
                <li key={review.reviewId}>
                  <ReviewCard {...review} currentUser={user} />
                </li>
              );
            })
          ) : (
            <Message type="info">{`There are no reviews yet.`}</Message>
          )}
        </ul>
        {reviews?.length > 0 && !isScreen && (
          <div className="footer">
            <Button
              classes="text"
              onClick={() => {
                setEndpoint({
                  ...endpoint,
                  pageSize: `${
                    endpoint.pageSize === 'pageSize=3&' ? 'pageSize=13&' : 'pageSize=3&'
                  }`
                });
                scrollTo(reviewsRef);
              }}
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

            <Button classes="text" onClick={() => history.push(`/reviews/${productId}`)}>
              See all reviews
            </Button>

            <Pagination
              updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
              currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
              pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
              totalItems={reviews?.[0]?.totalDBItems}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
