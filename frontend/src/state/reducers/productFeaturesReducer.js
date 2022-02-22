import {
  PRODUCT_FEATURES_LIST_FAIL,
  PRODUCT_FEATURES_LIST_REQUEST,
  PRODUCT_FEATURES_LIST_SUCCESS,
  PRODUCT_FEATURE_CREATE_FAIL,
  PRODUCT_FEATURE_CREATE_REQUEST,
  PRODUCT_FEATURE_CREATE_RESET,
  PRODUCT_FEATURE_CREATE_SUCCESS,
  PRODUCT_FEATURE_DELETE_FAIL,
  PRODUCT_FEATURE_DELETE_REQUEST,
  PRODUCT_FEATURE_DELETE_SUCCESS,
  PRODUCT_FEATURE_UPDATE_FAIL,
  PRODUCT_FEATURE_UPDATE_REQUEST,
  PRODUCT_FEATURE_UPDATE_RESET,
  PRODUCT_FEATURE_UPDATE_SUCCESS
} from '../constants/productConstants';

export const productFeaturesListReducer = (state = { productFeatures: [] }, action) => {
  switch (action.type) {
    case PRODUCT_FEATURES_LIST_REQUEST:
      return { loading: true, productFeatures: [] };
    case PRODUCT_FEATURES_LIST_SUCCESS:
      return { loading: false, productFeatures: action.payload };
    case PRODUCT_FEATURES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productFeaturesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FEATURE_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_FEATURE_CREATE_SUCCESS:
      return { loading: false, success: true, productFeature: action.payload };
    case PRODUCT_FEATURE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_FEATURE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productFeaturesUpdateReducer = (state = { productFeature: {} }, action) => {
  switch (action.type) {
    case PRODUCT_FEATURE_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_FEATURE_UPDATE_SUCCESS:
      return { loading: false, success: true, productFeature: action.payload };
    case PRODUCT_FEATURE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_FEATURE_UPDATE_RESET:
      return { productFeature: {} };
    default:
      return state;
  }
};

export const productFeaturesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FEATURE_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_FEATURE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_FEATURE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
