import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CheckoutBreadcrumbs.css';

const CheckoutBreadcrumbs = ({ currentStep = 'Cart', orderId }) => {
  const steps = [
    { label: 'Cart', path: '/cart' },
    { label: 'Shipping', path: '/shipping' },
    { label: 'Pay Info', path: '/payment' },
    { label: 'Place Order', path: '/placeorder' },
    { label: 'Pay Order', path: `/order/${orderId}`}
  ];

  // disable Link for next steps
  const linkHandler = (e, index) => {
    if (index > steps.indexOf(steps.find((step) => step.label === currentStep))) {
      e.preventDefault();
    }
  };

  return (
    <ul className="checkout_breadcrumbs flex">
      {steps.map((step, index) => (
        <li
          className={`step ${
            index < steps.indexOf(steps.find((step) => step.label === currentStep))
              ? 'complete'
              : index > steps.indexOf(steps.find((step) => step.label === currentStep))
              ? ''
              : 'current'
          }`}
        >
          <Link to={step.path} onClick={(e) => linkHandler(e, index)}>
            <div className="label">{step.label}</div>
          </Link>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
          <div href="#" className="dot"></div>
        </li>
      ))}
    </ul>
  );
};

export default CheckoutBreadcrumbs;

// {step1 ? <Link to="/login">Sign In</Link> : <Link disabled>Sign In</Link>}
//       {step2 ? <Link to="/shipping">Shipping</Link> : <Link disabled>Shipping</Link>}
//       {step3 ? <Link to="/payment">Payment</Link> : <Link disabled>Payment</Link>}
//       {step4 ? <Link to="/placeorder">Place Order</Link> : <Link disabled>Place Order</Link>}
