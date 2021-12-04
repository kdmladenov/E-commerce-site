import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import Button from '../components/Button';
import CheckoutBreadcrumbs from '../components/CheckoutBreadcrumbs';
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
    <main className="payment_screen">
      <div className="payment_container">
        <div className="header card">
          <CheckoutBreadcrumbs currentStep="Payment" />
        </div>
        <section className={`payment_options_container card `}>
          <h1>Select A Payment Method</h1>
          <form>
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
            <Button classes="yellow rounded" type="submit" onClick={submitHandler}>
              Continue to Place Order
            </Button>
        </section>
      </div>
    </main>

    // <div className="shipping">
    //   <div className="container">
    //     <div className="header">
    //       <CheckoutBreadcrumbs currentStep="Payment" />
    //     </div>
    //     <form>
    //       <legend>Select A Payment Method</legend>
    //       <input
    //         id="Paypal"
    //         type="radio"
    //         value={paymentMethod}
    //         required
    //         checked
    //         onChange={(e) => setPaymentMethod(e.target.value)}
    //       />
    //       <label htmlFor="Paypal">Paypal or Credit Card</label>
    //     </form>
    //     <button type="submit" onClick={submitHandler} className="btn btn-primary">
    //       Continue
    //     </button>
    //   </div>
    // </div>
  );
};

export default PaymentScreen;
