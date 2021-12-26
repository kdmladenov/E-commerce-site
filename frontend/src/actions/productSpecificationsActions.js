import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import {
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SPECIFICATION_CREATE_FAIL,
  PRODUCT_SPECIFICATION_CREATE_REQUEST,
  PRODUCT_SPECIFICATION_CREATE_SUCCESS,
  PRODUCT_SPECIFICATION_DELETE_FAIL,
  PRODUCT_SPECIFICATION_DELETE_REQUEST,
  PRODUCT_SPECIFICATION_DELETE_SUCCESS,
  PRODUCT_SPECIFICATION_UPDATE_FAIL,
  PRODUCT_SPECIFICATION_UPDATE_REQUEST,
  PRODUCT_SPECIFICATION_UPDATE_SUCCESS
} from '../constants/productConstants';

export const createProductSpecification =
  (productSpecificationData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_SPECIFICATION_CREATE_REQUEST
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
        `${BASE_URL}/products/${productSpecificationData.id}/specifications`,
        productSpecificationData,
        config
      );

      dispatch({
        type: PRODUCT_SPECIFICATION_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_SPECIFICATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const updateProductSpecification =
  (updatedProductSpecification) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_SPECIFICATION_UPDATE_REQUEST
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
      await axios.put(
        `${BASE_URL}/products/${updatedProductSpecification.id}/specifications`,
        updatedProductSpecification,
        config
      );

      dispatch({
        type: PRODUCT_SPECIFICATION_UPDATE_SUCCESS
      });

      // // update the state everywhere
      // const { data } = await axios.get(
      //   `${BASE_URL}/products/${updatedProductSpecification.productId}`
      // );

      // dispatch({
      //   type: PRODUCT_DETAILS_SUCCESS,
      //   payload: data
      // });
    } catch (error) {
      dispatch({
        type: PRODUCT_SPECIFICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const deleteProductSpecification = (specificationId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_SPECIFICATION_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${BASE_URL}/products/${specificationId}/specifications`, config);

    dispatch({
      type: PRODUCT_SPECIFICATION_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SPECIFICATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};


