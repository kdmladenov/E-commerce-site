import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import './styles/ProductScreen.css';
import { detailedProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailedProducts(match.params.id));
  }, [dispatch, match]);

  const fetchedProduct = useSelector((state) => state.productDetails);
  const { product, loading, error } = fetchedProduct;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="product_detailCard">
          <div className="product_detailCardLeft">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product_detailCardMiddle">
            <div className="product_detailCardName">{product.title}</div>
            <div className="product_detailCardBrand">by {product.brand}</div>
            <div className="product_detailCardRating">
              <Rating
                rating={product.rating}
                text={` from ${product.reviewCount} reviews`}
                color="orange"
              ></Rating>
            </div>
            <div className="product_detailCardDescription">Description: {product.description}</div>
          </div>
          <div className="product_detailCardRight">
            <dir className="product_detailCardRightItem">
              <h4>Price:</h4>
              <dir>
                <strong>${product.price}</strong>
              </dir>
            </dir>

            <dir className="product_detailCardRightItem">
              <h4>Status:</h4>
              <dir>{product.stockCount === 0 ? 'Out of Stock' : 'In Stock'}</dir>
            </dir>

            {product.stockCount > 0 && (
              <dir className="product_detailCardRightItem">
                <h4>Qty: </h4>
                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.stockCount).keys()].map((index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Form.Control>
              </dir>
            )}

            <dir>
              <button type="button" disabled={product.countInStock === 0}>
                Add To Cart
              </button>
            </dir>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
