import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
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

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/admin/orderlist" component={OrderListScreenAdmin} />
      <Route path="/admin/product/create" component={ProductCreateScreenAdmin} />
      <Route path="/admin/product/:id/edit" component={ProductEditScreenAdmin} />
      <Route path="/products/:id" component={ProductScreen} />
      <Route path="/productlist" component={ProductListScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/admin/userlist" component={UserListScreenAdmin} />
      <Route path="/admin/productlist" component={ProductListScreenAdmin} />
      <Route path="/admin/user/:id/edit" component={UserEditScreenAdmin} />
      <Route path="/profile" component={ProfileScreen} />
      <Route exact path="/" component={HomeScreen} />
      <Footer />
    </Router>
  );
};

export default App;
