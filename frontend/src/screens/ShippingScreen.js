import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/ShippingScreen.css';
import { getUserDetails, updateUserProfile } from '../state/actions/userActions';
import validateInputUser from '../validations/userValidator';
import profileAddressInitialInputState from '../inputs/profileAddressInitialInputState';
import checkoutBreadcrumbsSteps from '../inputs/checkoutBreadcrumbsSteps';

import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import FormComponent from '../components/FormComponent';

const ShippingScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
  }, [dispatch, user, userInfo]);

  return (
    <main className="shipping_screen">
      <div className="shipping_container">
        <div className="nav card">
          <BreadcrumbsSteps currentStep="Shipping" steps={checkoutBreadcrumbsSteps} />
        </div>
        <section className={`address_container card `}>
          <h1>Shipping Address</h1>
          <FormComponent
            inputData={profileAddressInitialInputState}
            updateAction={updateUserProfile}
            getDetailsAction={getUserDetails}
            resourceId={user?.userId}
            resource={user}
            validateInput={validateInputUser}
            screen="shipping"
          />
        </section>
      </div>
    </main>
  );
};

export default ShippingScreen;
