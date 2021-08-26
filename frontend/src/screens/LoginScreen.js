import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './styles/LoginScreen.css';

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!error && userInfo?.token) {
      history.push(redirect);
    }
  }, [history, userInfo, error, redirect]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Sign In</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login_signInButton" onClick={loginHandler}>
            Log In
          </button>
        </form>
        <div className="registerRedirect">
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
