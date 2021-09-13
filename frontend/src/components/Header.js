import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import productCategoriesEnum from '../constants/product-categories.enum';
import DropDown from './Dropdown';
import './styles/Header.css';
import { logout } from '../actions/userActions';
import NavSearchBar from './NavSearchBar';

const Header = () => {
  const [searchColumn, setSearchColumn] = useState('All Categories');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          className="header_logo"
        />
      </Link>
      <div className="search">
      <NavSearchBar/>
      </div>
      <div className="header_nav">
        {userInfo?.token ? (
          <DropDown
            className="header_option"
            classNameMenu="header_optionUserMenu"
            selected={<i className="fas fa-user" />}
            options={[
              <Link to={'/profile'}>Profile</Link>,
              <Link onClick={logoutHandler}>Log out</Link>
            ]}
          >
            <i className="fas fa-user" />
          </DropDown>
        ) : (
          <Link to="/login">
            <div className="header_option">
              <i className="fas fa-user" />
            </div>
          </Link>
        )}

        <Link to="/cart">
          <div className="header_option">
            <i className="fa fa-shopping-cart fa_custom fa-3x" id="header_optionCart"></i>
            <span className="badge">{cartItems?.length || 0}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
