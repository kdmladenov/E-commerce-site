import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { numberDecimalFix } from '../constants/utility-functions';
import Button from './Button';
import Price from './Price';
import './styles/CartItems.css';
import Tooltip from './Tooltip';

const CartItems = ({ cartItems }) => {
  const history = useHistory();
  return (
    <div className="cart_items_menu">
      <div className="subtotal">
        <span>Subtotal</span>
        <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)} items</span>
        <span className="subtotal_value">
          $ {numberDecimalFix(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))}
        </span>
      </div>
      <Button onClick={() => history.push('/cart')} classes="blue rounded">
        Go to Cart
      </Button>
      <ul className="cart_items_list">
        {cartItems?.map((item, index) => (
          <li key={index}>
            <Tooltip
              text={
                <div className="info">
                  <div className="title">{item.title}</div>
                  <div className="price_qty flex">
                    {item.qty}
                    <span>x</span>
                    <Price price={item.price} size="small" color="white" />
                  </div>
                </div>
              }
            >
              <Link to={`/products/${item.productId}`}>
                <img src={item.image} alt={item.title} />
              </Link>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
