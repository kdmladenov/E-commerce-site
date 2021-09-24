import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CheckoutSteps.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkout_steps flex m-auto">
      {step1 ? <Link to="/login">Sign In</Link> : <Link disabled>Sign In</Link>}
      {step2 ? <Link to="/shipping">Shipping</Link> : <Link disabled>Shipping</Link>}
      {step3 ? <Link to="/payment">Payment</Link> : <Link disabled>Payment</Link>}
      {step4 ? <Link to="/placeorder">Place Order</Link> : <Link disabled>Place Order</Link>}
    </div>
  );
};

export default CheckoutSteps;
