import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {
  PRODUCT_FEATURES_LIST_FAIL,
  PRODUCT_FEATURES_LIST_REQUEST,
  PRODUCT_FEATURES_LIST_SUCCESS,
  PRODUCT_FEATURE_CREATE_FAIL,
  PRODUCT_FEATURE_CREATE_REQUEST,
  PRODUCT_FEATURE_CREATE_SUCCESS,
  PRODUCT_FEATURE_DELETE_FAIL,
  PRODUCT_FEATURE_DELETE_REQUEST,
  PRODUCT_FEATURE_DELETE_SUCCESS,
  PRODUCT_FEATURE_UPDATE_FAIL,
  PRODUCT_FEATURE_UPDATE_REQUEST,
  PRODUCT_FEATURE_UPDATE_SUCCESS
} from '../constants/productConstants';

export const listProductFeatures = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FEATURES_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/products/${productId}/features`);

    dispatch({
      type: PRODUCT_FEATURES_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FEATURES_LIST_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message
    });
  }
};

export const createProductFeature =
  (productId, productFeatureData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_FEATURE_CREATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/products/${productId}/features`,
        productFeatureData,
        config
      );

      dispatch({
        type: PRODUCT_FEATURE_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FEATURE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const updateProductFeature =
  (featureId, updatedProductFeature) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_FEATURE_UPDATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.put(`${BASE_URL}/products/${featureId}/features`, updatedProductFeature, config);

      dispatch({
        type: PRODUCT_FEATURE_UPDATE_SUCCESS
      });

      // update the state everywhere
      const { data } = await axios.get(
        `${BASE_URL}/products/${updatedProductFeature.productId}/features`
      );

      dispatch({
        type: PRODUCT_FEATURES_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FEATURE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const deleteProductFeature = (featureId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_FEATURE_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${BASE_URL}/products/${featureId}/features`, config);

    dispatch({
      type: PRODUCT_FEATURE_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FEATURE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
