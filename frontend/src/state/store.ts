import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productImageDeleteReducer,
  productImageSetMainReducer,
  productImagesListReducer,
  productImageUploadReducer,
  productListReducer,
  productRestoreReducer,
  productUpdateReducer
} from './reducers/productReducers';
import {
  forgottenPasswordReducer,
  passwordResetReducer,
  userAvatarDeleteReducer,
  userAvatarUpdateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userRestoreReducer,
  userUpdateProfileReducer
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
  answerCreateReducer,
  answerDeleteReducer,
  answerEditReducer,
  questionAskReducer,
  questionDeleteReducer,
  questionEditReducer,
  questionsAndAnswersListReducer,
  questionVoteReducer
} from './reducers/questionsAndAnswersReducers';
import { portalRefsReducer } from './reducers/portalReducers';
import {
  productFeaturesCreateReducer,
  productFeaturesDeleteReducer,
  productFeaturesListReducer,
  productFeaturesUpdateReducer
} from './reducers/productFeaturesReducer';
import {
  productSpecificationCreateReducer,
  productSpecificationDeleteReducer,
  productSpecificationUpdateReducer
} from './reducers/productSpecificationsReducer';

const reducer = combineReducers({
  portalRefs: portalRefsReducer,
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productRestore: productRestoreReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productFeaturesList: productFeaturesListReducer,
  productFeaturesCreate: productFeaturesCreateReducer,
  productFeaturesUpdate: productFeaturesUpdateReducer,
  productFeaturesDelete: productFeaturesDeleteReducer,
  productSpecificationCreate: productSpecificationCreateReducer,
  productSpecificationUpdate: productSpecificationUpdateReducer,
  productSpecificationDelete: productSpecificationDeleteReducer,
  productImageUpload: productImageUploadReducer,
  productImagesList: productImagesListReducer,
  productImageDelete: productImageDeleteReducer,
  productImageSetMain: productImageSetMainReducer,
  reviewCreate: reviewCreateReducer,
  reviewDelete: reviewDeleteReducer,
  reviewList: reviewListReducer,
  reviewEdit: reviewEditReducer,
  reviewVote: reviewVoteReducer,
  questionVote: questionVoteReducer,
  questionAsk: questionAskReducer,
  questionsAndAnswersList: questionsAndAnswersListReducer,
  questionEdit: questionEditReducer,
  questionDelete: questionDeleteReducer,
  answerCreate: answerCreateReducer,
  answerEdit: answerEditReducer,
  answerDelete: answerDeleteReducer,
  browsingHistoryAdd: browsingHistoryAddReducer,
  browsingHistoryList: browsingHistoryListReducer,
  browsingHistoryDelete: browsingHistoryDeleteReducer,
  wishListAdd: wishListAddReducer,
  wishListItems: wishListItemsReducer,
  wishListDelete: wishListDeleteReducer,
  forgottenPassword: forgottenPasswordReducer,
  passwordReset: passwordResetReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userRestore: userRestoreReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAvatarUpdate: userAvatarUpdateReducer,
  userAvatarDelete: userAvatarDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderMyList: orderMyListReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : [];

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress')!)
  : [];

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod')!)
  : [];

const initialState = {
  cart: {
    ...shippingAddressFromLocalStorage,
    cartItems: cartItemsFromLocalStorage,
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
