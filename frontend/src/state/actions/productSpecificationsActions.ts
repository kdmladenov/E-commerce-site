import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import SpecificationType from '../../models/SpecificationType';
import ProductSpecificationCreateActionType from '../../models/state/actions/ProductSpecificationCreateActionType';
import ProductSpecificationDeleteActionType from '../../models/state/actions/ProductSpecificationDeleteActionType';
import ProductSpecificationUpdateActionType from '../../models/state/actions/ProductSpecificationUpdateActionType';
import StateType from '../../models/state/StateType';
import {
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
  (productSpecificationData: SpecificationType) =>
  async (dispatch: Dispatch<ProductSpecificationCreateActionType>, getState: () => StateType) => {
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
        `${BASE_URL}/products/${productSpecificationData.specificationId}/specifications`,
        productSpecificationData,
        config
      );

      dispatch({
        type: PRODUCT_SPECIFICATION_CREATE_SUCCESS,
        payload: data
      });
      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
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
  (updatedProductSpecification: SpecificationType) =>
  async (dispatch: Dispatch<ProductSpecificationUpdateActionType>, getState: () => StateType) => {
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
      const { data } = await axios.put(
        `${BASE_URL}/products/${updatedProductSpecification.specificationId}/specifications`,
        updatedProductSpecification,
        config
      );

      dispatch({
        type: PRODUCT_SPECIFICATION_UPDATE_SUCCESS,
        payload: data
      });

      // // update the state everywhere
      // const { data } = await axios.get(
      //   `${BASE_URL}/products/${updatedProductSpecification.productId}`
      // );

      // dispatch({
      //   type: PRODUCT_DETAILS_SUCCESS,
      //   payload: data
      // });

      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_SPECIFICATION_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteProductSpecification =
  (specificationId: number) =>
  async (dispatch: Dispatch<ProductSpecificationDeleteActionType>, getState: () => StateType) => {
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

      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`,
        config
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_SPECIFICATION_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
