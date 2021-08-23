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

const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={HomeScreen} />
      <Route path="/products/:id" component={ProductScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Footer />
    </Router>
  );
};

export default App;
