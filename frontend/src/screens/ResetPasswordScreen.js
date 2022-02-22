import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { resetPassword } from '../state/actions/userActions';
import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { userResetPasswordInitialInputState } from '../constants/inputMaps';
import validateInputUser from '../validations/userValidator';
import './styles/ResetPasswordScreen.css';

const ResetPasswordScreen = ({ history, match }) => {
  const { userId, token } = match.params;

  const {
    loading,
    success: successResetPassword,
    message: successResetMessage,
    error: errorMessage
  } = useSelector((state) => state.passwordReset);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!errorMessage && userInfo?.token) {
      history.push('/');
    }
  }, [history, userInfo, errorMessage]);

  return (
    <div className="reset_password_screen flex">
      <div className="reset_password_container card flex">
        <h1>Reset your password</h1>
        <h5>Please enter your new password</h5>
        {loading && <Loader />}
        {errorMessage && <Message type="error">{errorMessage}</Message>}
        {successResetPassword ? (
          <Message type="success">{successResetMessage}</Message>
        ) : (
          <FormComponent
            inputData={userResetPasswordInitialInputState}
            authorizationAction={resetPassword}
            validateInput={validateInputUser}
            screen="resetPassword"
            resourceId={+userId}
            resetPasswordToken={token}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
