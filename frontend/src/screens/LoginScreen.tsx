import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import './styles/LoginScreen.css';
import { login } from '../state/actions/userActions';
import validateInputUser from '../validations/userValidator';
import userLoginInitialInputState from '../inputs/userLoginInitialInputState';

import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';
import Message from '../components/Message';
import useTypedSelector from '../hooks/useTypedSelector';

const LoginScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const userLogin = useTypedSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!error && userInfo?.token) {
      history.push(redirect);
    }
  }, [history, userInfo, error, redirect]);

  return (
    <div className="login_screen flex">
      <div className="login_container card flex">
        <h1>Log In</h1>
        {loading && <Loader />}
        {error && <Message type="error">{error}</Message>}

        <FormComponent
          inputData={userLoginInitialInputState}
          authorizationAction={login}
          validateInput={validateInputUser}
          screen="login"
        />
        <div className="registerRedirect">
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
        </div>
        <div className="registerRedirect">
          Forgot your password?
          <Link to={redirect ? `/forgotPassword?redirect=${redirect}` : '/forgotPassword'}>
            Reset
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
