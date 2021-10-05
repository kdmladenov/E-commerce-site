import React, { useRef, useState } from 'react';
import { numberDecimalFix } from '../constants/utility-functions.js/utility-functions';
import { useResize } from '../hooks/useResize';
import './styles/CartItems.css';

const CartItems = ({ cartItems }) => {
  const cartItemsToRender = cartItems?.map((item, index) => (
    <li key={index}>
      <img src={item.image} alt={item.title} />
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
