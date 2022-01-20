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
import ProductListScreen from './screens/ProductListScreen';
import BrowsingHistoryScreen from './screens/BrowsingHistoryScreen';
import WishListScreen from './screens/WishListScreen';
import AdminScreen from './screens/AdminScreen';
import Toast from './components/Toast';
import { useDispatch } from 'react-redux';
import { addToPortalRefs } from './actions/portalActions';
import ReviewsScreen from './screens/ReviewsScreen';
import QuestionsAndAnswersScreen from './screens/QuestionsAndAnswersScreen';
import BrandStoreScreen from './screens/BrandStoreScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ForgottenPasswordScreen from './screens/ForgottenPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

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
      <Route path="/cart/:productId?" component={CartScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order/:orderId" component={OrderScreen} />
      <Route path="/admin/main/:section" component={AdminScreen} />
      <Route path="/admin/product/create" component={ProductEditScreen} />
      <Route path="/admin/product/:productId/edit" component={ProductEditScreen} />
      <Route path="/products/:productId" component={ProductScreen} />
      <Route path="/reviews/:productId" component={ReviewsScreen} />
      <Route path="/questions/:productId" component={QuestionsAndAnswersScreen} />
      <Route path="/productlist" component={ProductListScreen} />
      <Route path="/wishlist" component={WishListScreen} />
      <Route path="/history" component={BrowsingHistoryScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/forgotPassword" component={ForgottenPasswordScreen} />
      <Route path="/resetPassword/:userId/:token" component={ResetPasswordScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/account/:section" component={AccountScreen} />
      <Route path="/search/:searchTerm" component={ProductListScreen} />
      <Route path="/store/:brand" component={BrandStoreScreen} />
      <Route exact path="/" component={HomeScreen} />
      {/* <Footer /> */}
      <Toast ref={toastRef} />
      <Toast ref={toastCartRef} idDiv="toast_cart" />
    </Router>
  );
};

export default App;
