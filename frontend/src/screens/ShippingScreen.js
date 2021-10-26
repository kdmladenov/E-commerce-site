import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import './styles/ShippingScreen.css';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [address2, setAddress2] = useState(shippingAddress.address2);
  const [city, setCity] = useState(shippingAddress.city);
  const [zip, setZip] = useState(shippingAddress.zip);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, address2, city, zip, state, country }));
    history.push('/payment');
  };
  return (
    <div className="shipping">
      <div className="container">
        <CheckoutSteps step1 step2 />
        <form>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              placeholder="Enter address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              placeholder="Enter zip"
              value={zip}
              required
              onChange={(e) => setZip(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              placeholder="Enter state"
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary" onClick={submitHandler}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
