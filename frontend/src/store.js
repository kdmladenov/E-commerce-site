import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
  userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk]; // in case we add additional middleware

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
