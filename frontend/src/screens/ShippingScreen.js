import React from 'react';
import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import FormComponent from '../components/FormComponent';
import { checkoutBreadcrumbsSteps, profileAddressInitialInputState } from '../constants/inputMaps';
import './styles/ShippingScreen.css';

const ShippingScreen = () => {
  return (
    <main className="shipping_screen">
      <div className="shipping_container">
        <div className="nav card">
          <BreadcrumbsSteps currentStep="Shipping" steps={checkoutBreadcrumbsSteps} />
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
