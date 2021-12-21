import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import {
  DAYS_FOR_DELIVERY,
  DAYS_FOR_RETURNS_AFTER_DELIVERY,
  FREE_SHIPPING_THRESHOLD,
  MAX_PRODUCT_QTY_FOR_PURCHASE,
  STORE_NAME
} from '../constants/constants';
import { getDate } from '../constants/utility-functions';
import Button from './Button';
import Popover from './Popover';
import Price from './Price';
import './styles/ProductScreenActionBox.css';

const ProductScreenActionBox = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { productId, title, brand, image, price, stockCount } = product;

  const portalRefs = useSelector((state) => state.portalRefs);
  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = portalRefs;

  const addToCartHandler = () => {
    dispatch(addToCart(productId, +qty));
    toastCartRef.current.createToast({ title, image, price, qty });
  };

  const currentDate = new Date();

  return (
    <ul>
      <li>
        <Price price={price} />
      </li>

      {stockCount !== 0 && (
        <li>
          <Popover
            direction="bottom"
            header={
              <h3 style={{ color: price >= FREE_SHIPPING_THRESHOLD ? 'green' : 'black' }}>{`${
                price >= FREE_SHIPPING_THRESHOLD ? 'FREE DELIVERY' : '$50 Shipping cost '
              }`}</h3>
            }
          >
            {`FREE delivery on orders over $${FREE_SHIPPING_THRESHOLD} `}
          </Popover>
        </li>
      )}
      <li>
        <Popover header={<h3>{`Arrives ${getDate(currentDate, DAYS_FOR_DELIVERY)}`}</h3>}>
          {'Order until the end of the day.'}{' '}
        </Popover>
      </li>
      <li>
        <h3 style={{ color: stockCount === 0 ? 'red' : 'green' }}>
          {stockCount === 0 ? 'Out of Stock' : 'In Stock'}
        </h3>
      </li>
      <li>
        {stockCount > 0 && (
          <select value={qty} onChange={(e) => setQty(e.target.value)}>
            <option value="" disabled selected hidden>
              {`Qty: ${qty}`}
            </option>
            {[...Array(stockCount).keys()]
              .slice(0, Math.min(stockCount, MAX_PRODUCT_QTY_FOR_PURCHASE))
              .map((index) => (
                <option key={index + 1} value={index + 1}>
                  {qty === index + 1 ? `Qty: ${index + 1}` : index + 1}
                </option>
              ))}
          </select>
        )}
      </li>
      <li className="add_to_cart_btn">
        <Button onClick={addToCartHandler} disabled={stockCount === 0} classes="rounded">
          {stockCount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </li>
      <li>
        <i className="fa fa-lock"></i>
        Secure transaction
      </li>
      <li>
        <table>
          <tbody>
            <tr>
              <td>Ships from</td>
              <td>{STORE_NAME}</td>
            </tr>
            <tr>
              <td>Sold by</td>
              <td>
                <Link to={`/store/${brand}`}>
                  <Button classes="text">{brand}</Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
      <li>
        <Popover
          header={
            <h3>{`Returnable until ${getDate(
              currentDate,
              DAYS_FOR_DELIVERY + DAYS_FOR_RETURNS_AFTER_DELIVERY
            )}`}</h3>
          }
        >
          {`Items can be returned within ${DAYS_FOR_RETURNS_AFTER_DELIVERY} days of delivery.`}
        </Popover>
      </li>
    </ul>
  );
};

export default ProductScreenActionBox;
