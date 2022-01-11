import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import FormComponent from '../components/FormComponent';
import { checkoutBreadcrumbsSteps, profileAddressInitialInputState } from '../constants/inputMaps';
import validateInputUser from '../validations/userValidator';
import './styles/ShippingScreen.css';

const ShippingScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

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
