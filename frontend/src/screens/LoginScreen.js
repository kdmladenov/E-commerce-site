import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { userLoginInitialInputState } from '../constants/inputMaps';
import validateInputUser from '../validations/userValidator';
import './styles/LoginScreen.css';

const LoginScreen = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
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
          <Link to={redirect ? `/forgotPassword?redirect=${redirect}` : '/forgotPassword'}
            Reset
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
