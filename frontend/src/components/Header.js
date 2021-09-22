import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from './Dropdown';
import './styles/Header.css';
import { logout } from '../actions/userActions';
import SearchBarNav from './SearchBarNav';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [searchColumn, setSearchColumn] = useState('All Categories');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  userInfo && console.log(userInfo.role, 'userInfo');
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="logo_mega_menu_group">
        <div className="mega_menu">
          <MegaMenu />
        </div>
        <Link to="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="logo"
            className="header_logo"
          />
        </Link>
      </div>
      <div className="search">
        <SearchBarNav />
      </div>
      <div className="header_options">
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
        {userInfo?.role === 'admin' && (
          <DropDown
            className="header_option"
            classNameMenu="header_optionAdminMenu"
            selected={<i className="fa fa-user-plus" />}
            options={[
              <Link to={'/admin/userlist'}>Users</Link>,
              <Link to={'/admin/productlist'}>Products</Link>,
              <Link to={'/admin/orderlist'}>Orders</Link>
            ]}
          >
            <i className="fa fa-user-plus" />
          </DropDown>
        )}

        <Link to="/cart">
          <div className="header_option cart">
            <i className="fa fa-shopping-cart"></i>
            {cartItems.length > 0 && <div className="badge">{cartItems.length}</div>}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
