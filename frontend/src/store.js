import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer
} from './reducers/productReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMyListReducer,
  orderPayReducer
} from './reducers/orderReducers';
import {
  reviewCreateReducer,
  reviewDeleteReducer,
  reviewEditReducer,
  reviewListReducer,
  reviewVoteReducer
} from './reducers/reviewReducers';
import {
  browsingHistoryAddReducer,
  browsingHistoryDeleteReducer,
  browsingHistoryListReducer
} from './reducers/browsingHistoryReducers';
import {
  wishListAddReducer,
  wishListDeleteReducer,
  wishListItemsReducer
} from './reducers/wishListReducers';
import {
  questionAskReducer,
  questionEditReducer,
  questionsAndAnswersListReducer
} from './reducers/questionsAndAnswersReducers';

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  reviewCreate: reviewCreateReducer,
  reviewDelete: reviewDeleteReducer,
  reviewList: reviewListReducer,
  reviewEdit: reviewEditReducer,
  reviewVote: reviewVoteReducer,
  questionAsk: questionAskReducer,
  questionsAndAnswersList: questionsAndAnswersListReducer,
  questionEdit: questionEditReducer,
  browsingHistoryAdd: browsingHistoryAddReducer,
  browsingHistoryList: browsingHistoryListReducer,
  browsingHistoryDelete: browsingHistoryDeleteReducer,
  wishListAdd: wishListAddReducer,
  wishListItems: wishListItemsReducer,
  wishListDelete: wishListDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderMyList: orderMyListReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : [];

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : [];

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage
  },
  userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk]; // in case we add additional middleware

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
