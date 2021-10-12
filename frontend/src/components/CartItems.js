import React from 'react';
import { Link } from 'react-router-dom';
import { numberDecimalFix } from '../constants/utility-functions.js/utility-functions';
import './styles/CartItems.css';

const CartItems = ({ cartItems, setShowCartMenu }) => {
  const cartItemsToRender = cartItems?.map((item, index) => (
    <li onClick={() => setShowCartMenu(false)} key={index}>
      <Link to={`/products/${item.id}`}>
        <img src={item.image} alt={item.title} />
      </Link>
    </li>
  ));

  return (
    <div className="cart_items_menu">
      <div className="subtotal">
        <span>Subtotal</span>
        {/* <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)} items</span> */}
        <span className="subtotal_value">
          $ {numberDecimalFix(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))}
        </span>
      </div>
      <ul className="cart_items_list">{cartItemsToRender}</ul>
    </div>
  );
};

export default CartItems;
