import React from 'react';
import CheckoutBreadcrumbs from '../components/CheckoutBreadcrumbs';
import FormComponent from '../components/FormComponent';
import { profileAddressInitialInputState } from '../constants/inputMaps';
import './styles/ShippingScreen.css';

const ShippingScreen = () => {
  return (
    <main className="shipping_screen">
      <div className="shipping_container">
        <div className="nav card">
          <CheckoutBreadcrumbs currentStep="Shipping" />
        </div>
        <section className={`address_container card `}>
          <h1>Shipping Address</h1>
          <FormComponent inputData={profileAddressInitialInputState} screen="shipping" />
        </section>
      </div>
    </main>
  );
};

export default ShippingScreen;
