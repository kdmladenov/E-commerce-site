import './styles/ProfileScreen.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  // const [reenteredPassword, setReenteredPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user?.email) {
        dispatch(getUserDetails(userInfo.userId)); //instead of id in getUserDetails will be /users/profile in axios.get
      } else {
        setFullName(user.fullName);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setCity(user.city);
        setZip(user.zip);
        setState(user.state);
        setCountry(user.country);
        // No password
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== reenteredPassword) {
    //   setMessage('The passwords do not match.');
    // } else {
    dispatch(
      updateUserProfile({
        id: userInfo.userId,
        fullName,
        email,
        phone,
        address,
        city,
        zip,
        state,
        country
      }))
    // }
    // UPDATE PASSWORD and FORGOTTEN PASSWORD TO BE IMPLEMENTED ADDITIONALLY
  };

  return (
    <div className=" ">
      <div className="col-3">
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant={success}>Profile Updated</Message>}
        <form className="form">
          <div className="formLeft">
            <h5>Full Name</h5>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <h5>E-mail</h5>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Phone number</h5>
            <input
              type="tel"
              placeholder="xxx-xxx-xxxx"
              value={phone}
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <h5>Password</h5>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h5>Reenter Password</h5>
            <input
              type="password"
              placeholder="Reenter Password"
              value={reenteredPassword}
              onChange={(e) => setReenteredPassword(e.target.value)}
            /> */}
          </div>
          <div className="formRight">
            <h5>Address</h5>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h5>City</h5>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <h5>Zip</h5>
            <input
              type="text"
              placeholder="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <h5>State</h5>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <h5>Country</h5>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button className="registerButton" onClick={submitHandler}>
            Update
          </button>
        </form>
      </div>
      <div className="col-9">
        <h2>My Orders</h2>
      </div>
    </div>
  );
};

export default ProfileScreen;
