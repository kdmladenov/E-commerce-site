import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreenAdmin from './screens/UserListScreenAdmin';
import UserEditScreenAdmin from './screens/UserEditScreenAdmin';
import ProductListScreenAdmin from './screens/ProductListScreenAdmin';
import ProductEditScreenAdmin from './screens/ProductEditScreenAdmin';
import ProductCreateScreenAdmin from './screens/ProductCreateScreenAdmin';
import OrderListScreenAdmin from './screens/OrderListScreenAdmin';
import ProductListScreen from './screens/ProductListScreen';
import BrowsingHistoryScreen from './screens/BrowsingHistoryScreen';
import WishListScreen from './screens/WishListScreen';
import AdminScreen from './screens/AdminScreen';
import Toast from './components/Toast';
import { useDispatch } from 'react-redux';
import { addToPortalRefs } from './actions/portalActions';

const App = () => {
  const dispatch = useDispatch();
  const toastRef = useRef();
  const toastCartRef = useRef();

  useEffect(() => {
    dispatch(addToPortalRefs({ toast: toastRef }));
    dispatch(addToPortalRefs({ toast_cart: toastCartRef }));
  }, [dispatch, toastRef, toastCartRef]);

  return (
    <Router>
      <Header />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/admin/main/:section" component={AdminScreen} />
      <Route path="/admin/orderlist" component={OrderListScreenAdmin} />
      <Route path="/admin/product/create" component={ProductCreateScreenAdmin} />
      <Route path="/admin/product/:id/edit" component={ProductEditScreenAdmin} />
      <Route path="/products/:id" component={ProductScreen} />
      <Route path="/productlist" component={ProductListScreen} />
      <Route path="/wishlist" component={WishListScreen} />
      <Route path="/history" component={BrowsingHistoryScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/admin/userlist" component={UserListScreenAdmin} />
      <Route path="/admin/productlist" component={ProductListScreenAdmin} />
      <Route path="/admin/user/:id/edit" component={UserEditScreenAdmin} />
      <Route path="/account/:section" component={AccountScreen} />
      <Route path="/search/:searchTerm" component={ProductListScreen} />
      <Route exact path="/" component={HomeScreen} />
      {/* <Footer /> */}
      <Toast ref={toastRef} />
      <Toast ref={toastCartRef} idDiv="toast_cart" />
    </Router>
  );
};

export default App;
