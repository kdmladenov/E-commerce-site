import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './styles/UserEditScreen.css';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = +match.params.id;

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.fullName || userId !== user.userId) {
        dispatch(getUserDetails(userId));
      } else {
        setEmail(user.email);
        setPhone(user.phone);
        setFullName(user.fullName);
        setIsAdmin(user.role === 'admin');
        setAddress(user.address);
        setAddress2(user.address2);
        setCity(user.city);
        setZip(user.zip);
        setState(user.state);
        setCountry(user.country);
      }
    }
  }, [user, dispatch, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        userId,
        email,
        phone,
        fullName,
        role: isAdmin ? 'admin' : 'basic',
        address,
        address2,
        city,
        zip,
        state,
        country
      })
    );
  };
  return (
    <div className="user_edit">
      <div className="user_edit_go_back">
        <Link to="/admin/userList">
          <Button>Go back</Button>
        </Link>
      </div>

      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message type="success">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <form>
          <div className="form_left">
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
            <label>Is Admin</label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <div className="form_right">
            <h5>Address</h5>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h5>Address 2</h5>
            <input
              type="text"
              placeholder="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
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
          <div className="user_edit_btn">
            <Button onClick={submitHandler}>Edit User</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
