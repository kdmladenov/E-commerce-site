import React, { useEffect } from 'react';

import './styles/ResetPasswordScreen.css';
import { resetPassword } from '../state/actions/userActions';
import validateInputUser from '../validations/userValidator';
import userResetPasswordInitialInputState from '../inputs/userResetPasswordInitialInputState';
import useTypedSelector from '../hooks/useTypedSelector';

import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { RouteComponentProps } from 'react-router-dom';

const ResetPasswordScreen: React.FC<
  RouteComponentProps<{
    userId: string;
    token: string;
  }>
> = ({ history, match }) => {
  const { userId, token } = match.params;

  const {
    loading,
    success: successResetPassword,
    message: successResetMessage,
    error: errorMessage
  } = useTypedSelector((state) => state.passwordReset);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

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
