import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './styles/Header.css';
import { getUserDetails, logout } from '../actions/userActions';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import Login from './Login';
import CartItems from './CartItems';
import { useHistory } from 'react-router';
import DropDown from './Dropdown';
import Avatar from './Avatar';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const adminMenuToRender = (
    <ul className="menu_admin">
      <li>
        <NavLink to={'/admin/main/userlist'}>Users</NavLink>
      </li>
      <li>
        <NavLink to={'/admin/main/productlist'}>Products</NavLink>
      </li>
      <li>
        <NavLink to={'/admin/main/orderlist'}>Orders</NavLink>
      </li>
    </ul>
  );

  const userMenuToRender = (
    <div className="menu_user">
      <ul>
        <li>
          <NavLink to={'/account/profile'}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={'/account/orders'}>Orders</NavLink>
        </li>
        <li>
          <NavLink to={'/account/history'}>Browsing History</NavLink>
        </li>
        <li>
          <NavLink to={'/account/wishlist'}>Wish List</NavLink>
        </li>
      </ul>
      <div onClick={logoutHandler}>Log out</div>
    </div>
  );

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
  }, [dispatch, user, userInfo]);

  return (
    <header>
      <div className="logo_mega_menu_group">
        <div className="mega_menu">
          <MegaMenu />
        </div>
        <NavLink to="/">
          <img
            src="https://clipartart.com/images/clipart-logo-maker-online-free-9.png"
            alt="logo"
            className="header_logo"
          />
        </NavLink>
      </div>
      <div className="search">
        <SearchBar />
      </div>
      <div className="header_menu_btn_group">
        <DropDown
          userInfo={userInfo}
          button={
            <div className={`header_menu_btn ${userInfo?.token ? 'user' : 'login_menu'}`}>
              <Avatar classes="image_only" imageUrl={user?.avatar} fullName={user?.fullName} />
            </div>
          }
          tooltipText={`${userInfo?.token ? 'User Menu' : 'Login'}`}
        >
          {userInfo?.token ? userMenuToRender : <Login />}
        </DropDown>
        {userInfo?.role === 'admin' && (
          <DropDown
            userInfo={userInfo}
            button={
              <div className="header_menu_btn admin">
                <i className="fa fa-user-plus" />
              </div>
            }
            tooltipText="Admin Menu"
          >
            {adminMenuToRender}
          </DropDown>
        )}
        <DropDown
          userInfo={userInfo}
          button={
            <div className="header_menu_btn cart">
              <i
                onClick={() => {
                  history.push('/cart');
                }}
                className="fa fa-shopping-cart"
              ></i>
              {cartItems.length > 0 && <div className="badge">{cartItems.length}</div>}
            </div>
          }
          tooltipText="Cart"
        >
          <CartItems cartItems={cartItems} />
        </DropDown>
      </div>
    </header>
  );
};

export default Header;
