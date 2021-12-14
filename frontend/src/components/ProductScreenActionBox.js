import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { MAX_PRODUCT_QTY_FOR_PURCHASE } from '../constants/constants';
import Button from './Button';
import './styles/ProductScreenActionBox.css';

const ProductScreenActionBox = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { productId, title, image, price, stockCount } = product;

  const portalRefs = useSelector((state) => state.portalRefs);
  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = portalRefs;

  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty));
    toastCartRef.current.createToast({ title, image, price, qty });
  };

  return (
    <>
      <ul>
        <li>
          <h2>Price</h2>
          <h2>${price}</h2>
        </li>
        <li>
          <h2>Status</h2>
          <h2 style={{ color: stockCount === 0 ? 'red' : 'green' }}>
            {stockCount === 0 ? 'Out of Stock' : 'In Stock'}
          </h2>
        </li>
        <li>
          {stockCount > 0 && (
            <>
              <h2>Quantity </h2>
              <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(stockCount).keys()]
                  .slice(0, Math.min(stockCount, MAX_PRODUCT_QTY_FOR_PURCHASE))
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

      <Button onClick={addToCartHandler} disabled={stockCount === 0} classes="rounded">
        {stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </>
  );
};

export default ProductScreenActionBox;
