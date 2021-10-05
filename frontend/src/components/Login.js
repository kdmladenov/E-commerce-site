import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './styles/Login.css';

const Login = ({ match, history }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (!error && userInfo?.token) {
      history.push('/');
    }
  }, [history, userInfo, error]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login_form">
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message type="error">{error}</Message>}
      <form>
        <h6>E-mail</h6>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <h6>Password</h6>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label>Show Password</label>
        </p>

        <button onClick={loginHandler}>Log In</button>
      </form>
      <div className="registerRedirect">
        New Customer?
        <Link to={'/register'}> Register</Link>
      </div>
    </div>
  );
};

export default Login;
