import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './styles/Header.css';
import { logout } from '../actions/userActions';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import Tooltip from './Tooltip';
import Login from './Login';
import CartItems from './CartItems';
import { useHistory } from 'react-router';

const Header = () => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logout());
  };

  const adminMenuToRender = (
    <ul>
      <li>
        <Link to={'/admin/userlist'}>Users</Link>
      </li>
      <li>
        <Link to={'/admin/productlist'}>Products</Link>
      </li>
      <li>
        <Link to={'/admin/orderlist'}>Orders</Link>
      </li>
    </ul>
  );

  const userMenuToRender = (
    <ul>
      <li>
        <Link to={'/profile'}>Profile</Link>
      </li>
      <li>
        <Link onClick={logoutHandler}>Log out</Link>
      </li>
    </ul>
  );

  return (
    <header>
      <div className="logo_mega_menu_group">
        <div className="mega_menu">
          <MegaMenu />
        </div>
        <Link to="/">
          <img
            src="https://clipartart.com/images/clipart-logo-maker-online-free-9.png"
            alt="logo"
            className="header_logo"
          />
        </Link>
      </div>
      <div className="search">
        <SearchBar />
      </div>
      <div className="header_options">
        {userInfo?.token ? (
          <div
            className="header_option user"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
            onClick={() => setShowUserMenu(false)}
          >
            <i className="fas fa-user" />
            {showUserMenu && (
              <Tooltip visible={showUserMenu} direction={'top'}>
                {userMenuToRender}
              </Tooltip>
            )}
          </div>
        ) : (
          <div
            className="header_option login_menu"
            onMouseEnter={() => setShowLoginMenu(true)}
            onMouseLeave={() => setShowLoginMenu(false)}
            // onClick={() => setShowLoginMenu(false)}
          >
            <i className="fas fa-user" />
            {showLoginMenu && (
              <Tooltip visible={showLoginMenu} direction={'top'}>
                <Login />
              </Tooltip>
            )}
          </div>
        )}
        {userInfo?.role === 'admin' && (
          <div
            className="header_option admin"
            onMouseEnter={() => setShowAdminMenu(true)}
            onMouseLeave={() => setShowAdminMenu(false)}
            onClick={() => setShowAdminMenu(false)}
          >
            <i className="fa fa-user-plus" />
            {showAdminMenu && (
              <Tooltip visible={showAdminMenu} direction={'top'}>
                {adminMenuToRender}
              </Tooltip>
            )}
          </div>
        )}
        <div
          className="header_option cart"
          onMouseEnter={() => setShowCartMenu(true)}
          onMouseLeave={() => setShowCartMenu(false)}
          onClick={() => history.push('/cart')}
        >
          <i className="fa fa-shopping-cart"></i>
          {cartItems.length > 0 && <div className="badge">{cartItems.length}</div>}
          {showCartMenu && (
            <Tooltip visible={showCartMenu} direction={'left'}>
              <CartItems cartItems={cartItems} />
            </Tooltip>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
