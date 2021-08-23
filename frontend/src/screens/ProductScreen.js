import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import './styles/ProductScreen.css';
import { detailedProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailedProducts(match.params.id));
  }, [dispatch, match]);

  const fetchedProduct = useSelector((state) => state.productDetails);
  const { product, loading, error } = fetchedProduct;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  };

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
            <div className="product_detailCardTile">{product.title}</div>
            <div className="product_detailCardBrand">
              by <strong>{product.brand}</strong>
            </div>
            <div className="product_detailCardRating">
              <Rating
                rating={product.rating}
                text={` from ${product.reviewCount} reviews`}
                color="orange"
              ></Rating>
            </div>
            <div className="product_detailCardDescription">
              Description: <p>{product.description}</p>
            </div>
          </div>
          <div className="product_detailCardRight">
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
              <li>
                <button
                  type="button"
                  className="add_to_cart_btn"
                  disabled={product.stockCount === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
