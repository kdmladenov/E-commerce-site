import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import FeatureType from '../../models/FeatureType';
import ProductFeaturesCreateActionType from '../../models/state/actions/ProductFeaturesCreateActionType';
import ProductFeaturesDeleteActionType from '../../models/state/actions/ProductFeaturesDeleteActionType';
import ProductFeaturesListActionType from '../../models/state/actions/ProductFeaturesListActionType';
import ProductFeaturesUpdateActionType from '../../models/state/actions/ProductFeaturesUpdateActionType';
import StateType from '../../models/state/StateType';
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

export const listProductFeatures =
  (productId: number) => async (dispatch: Dispatch<ProductFeaturesListActionType>) => {
    try {
      dispatch({ type: PRODUCT_FEATURES_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/products/${productId}/features`);

      dispatch({
        type: PRODUCT_FEATURES_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_FEATURES_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const createProductFeature =
  (
    productId: number,
    productFeatureData: {
      featureTitle: string;
      featureContent: string;
    }
  ) =>
  async (dispatch: Dispatch<ProductFeaturesCreateActionType>, getState: () => StateType) => {
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
      axios.isAxiosError(error) &&
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
  (
    featureId: number,
    updatedProductFeature: {
      featureId: number;
      productId: number;
      featureTitle: string;
      featureContent: string;
    }
  ) =>
  async (
    dispatch: Dispatch<ProductFeaturesUpdateActionType | ProductFeaturesListActionType>,
    getState: () => StateType
  ) => {
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
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_FEATURE_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteProductFeature =
  (featureId?: number) =>
  async (dispatch: Dispatch<ProductFeaturesDeleteActionType>, getState: () => StateType) => {
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
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_FEATURE_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
