import React, { useEffect, useRef, useState } from 'react';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import './styles/ProductScreen.css';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { BASE_URL, MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';
import ProductImageGallery from '../components/ProductImageGallery';
import { useResize } from '../hooks/useResize';
import Button from '../components/Button';
import ReviewList from '../components/Review/ReviewList';
import { listReviews } from '../actions/reviewActions';
import { addBrowsingHistoryRecord } from '../actions/browsingHistoryActions';

// TO DO to fix aspect ratio of the zoomed image
const ProductScreen = ({ history, match }) => {
  const zoomedImageRef = useRef(null);
  const zoomedImageRect = useResize(zoomedImageRef);
  const [showZoomedImage, setShowZoomedImage] = useState(false);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews, loading: loadingReviews, error: errorReviews } = reviewList;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

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

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    dispatch(listReviews(match.params.id));
    dispatch(addBrowsingHistoryRecord(match.params.id));
  }, [dispatch, match]);

  useEffect(() => setSelectedImage(product.image), [product]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_details">
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
                  by <strong>{product.brand}</strong>
                </div>
                <div className="product_details_rating">
                  <Rating
                    rating={product.rating}
                    text={` from ${product.reviewCount} reviews`}
                    color="orange"
                  ></Rating>
                </div>
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
        </div>
      )}
      {loadingReviews ? (
        <Loader />
      ) : errorReviews ? (
        <Message type="error">{errorReviews}</Message>
      ) : product.reviewCount > 0 ? (
        <ReviewList reviews={reviews} currentUser={currentUser} productId={product.productId} />
      ) : (
        <Message type="success">There are no reviews for this product</Message>
      )}
    </main>
  );
};

export default ProductScreen;
