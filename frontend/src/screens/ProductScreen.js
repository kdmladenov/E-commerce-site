import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import './styles/ProductScreen.css';

const ProductScreen = () => {
  const [qty, setQty] = useState();

  const product = {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41dhCYGgBxL.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wireless High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 9,
    rating: 4.3,
    numReviews: 11
  };
  return (
    <>
      <div className="product_detailCard">
        <div className="product_detailCardLeft">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product_detailCardMiddle">
          <div className="product_detailCardName">{product.name}</div>
          <div className="product_detailCardBrand">by {product.brand}</div>
          <div className="product_detailCardRating">
            <Rating
              rating={product.rating}
              text={` from ${product.numReviews} reviews`}
              color="orange"
            ></Rating>
          </div>
          <div className="product_detailCardDescription">Description: {product.description}</div>
        </div>
        <div className="product_detailCardRight">
          <dir>
            <p>Price:</p>
            <dir>
              <strong>${product.price}</strong>
            </dir>
          </dir>

          <dir>
            <p>Status:</p>
            <dir>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</dir>
          </dir>

          {product.countInStock > 0 && (
            <dir>
              <p>Qty</p>
              <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(product.countInStock).keys()].map((index) => (
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
    </>
  );
};

export default ProductScreen;
