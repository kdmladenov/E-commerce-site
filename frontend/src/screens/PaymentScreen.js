import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import './styles/PaymentScreen.css';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    history.push('/placeorder');
  };
  return (
    <div className="shipping">
      <div className="container">
        <CheckoutSteps step1 step2 step3 />
        <form>
          <legend>Select A Payment Method</legend>
          <input
            id="Paypal"
            type="radio"
            value={paymentMethod}
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="Paypal">Paypal or Credit Card</label>
        </form>
        <button type="submit" onClick={submitHandler} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
