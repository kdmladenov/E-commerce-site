import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/PaymentScreen.css';
import { savePaymentMethod } from '../state/actions/cartActions';
import checkoutBreadcrumbsSteps from '../inputs/checkoutBreadcrumbsSteps';

import Button from '../components/Button';
import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import useTypedSelector from '../hooks/useTypedSelector';
import { RouteComponentProps } from 'react-router-dom';

const PaymentScreen: React.FC<RouteComponentProps> = ({ history }) => {
  const cart = useTypedSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <main className="payment_screen">
      <div className="payment_container">
        <div className="nav card">
          <BreadcrumbsSteps currentStep="Pay Info" steps={checkoutBreadcrumbsSteps} />
        </div>
        <section className="payment_options_container card flex">
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
            Proceed to Place Order
          </Button>
        </section>
      </div>
    </main>
  );
};

export default PaymentScreen;
