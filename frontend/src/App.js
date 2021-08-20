import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={HomeScreen} />
      <Route path="/products/:id" component={ProductScreen} />
      <Footer />
    </Router>
  );
};

export default App;
