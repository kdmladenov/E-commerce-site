import axios from 'axios';

import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_IMAGES_LIST_FAIL,
  PRODUCT_IMAGES_LIST_REQUEST,
  PRODUCT_IMAGES_LIST_SUCCESS,
  PRODUCT_IMAGE_DELETE_FAIL,
  PRODUCT_IMAGE_DELETE_REQUEST,
  PRODUCT_IMAGE_DELETE_SUCCESS,
  PRODUCT_IMAGE_SET_MAIN_FAIL,
  PRODUCT_IMAGE_SET_MAIN_REQUEST,
  PRODUCT_IMAGE_SET_MAIN_SUCCESS,
  PRODUCT_IMAGE_UPLOAD_FAIL,
  PRODUCT_IMAGE_UPLOAD_REQUEST,
  PRODUCT_IMAGE_UPLOAD_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_RESTORE_FAIL,
  PRODUCT_RESTORE_REQUEST,
  PRODUCT_RESTORE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
} from '../constants/productConstants';
import { BASE_URL } from '../../constants/constants';
import StateType from '../../models/state/StateType';
import { Dispatch } from 'redux';
import ProductsListActionType from '../../models/state/actions/ProductsListActionType';
import ProductDeleteActionType from '../../models/state/actions/ProductDeleteActionType';
import ProductRestoreActionType from '../../models/state/actions/ProductRestoreActionType';
import ProductType from '../../models/ProductType';
import ProductCreateActionType from '../../models/state/actions/ProductCreateActionType';
import ProductUpdateActionType from '../../models/state/actions/ProductUpdateActionType';
import ProductImageUploadActionType from '../../models/state/actions/ProductImageUploadActionType';
import ProductImagesListActionType from '../../models/state/actions/ProductImagesListActionType';
import ProductImageDeleteActionType from '../../models/state/actions/ProductImageDeleteActionType';
import ProductImageSetMainActionType from '../../models/state/actions/ProductImageSetMainActionType';
import ProductDetailsActionType from '../../models/state/actions/ProductDetailsActionType';

export const listProducts =
  (endpoint: string = '') =>
  async (dispatch: Dispatch<ProductsListActionType>) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/products?${endpoint}`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data
      });
      // update localStorage totalProductCount
      if (
        !localStorage.getItem('totalProductCount') ||
        data?.[0]?.totalDBItems > +localStorage.getItem('totalProductCount')!
      ) {
        localStorage.setItem('totalProductCount', data?.[0]?.totalDBItems);
      }
      if (!localStorage.getItem('allProductsList')) {
        const { data: allProductList } = await axios.get(
          `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`
        );
        localStorage.setItem('allProductsList', JSON.stringify(allProductList));
      }
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const listProductDetails =
  (productId: number) => async (dispatch: Dispatch<ProductDetailsActionType>) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/products/${productId}`);

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deleteProduct =
  (productId: number) =>
  async (dispatch: Dispatch<ProductDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/products/${productId}`, config);

      dispatch({
        type: PRODUCT_DELETE_SUCCESS
      });
      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const restoreProduct =
  (productId: number) =>
  async (dispatch: Dispatch<ProductRestoreActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: PRODUCT_RESTORE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.patch(`${BASE_URL}/products/${productId}/restore`, {}, config);

      dispatch({
        type: PRODUCT_RESTORE_SUCCESS
      });
      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_RESTORE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const createProduct =
  (productData: ProductType) =>
  async (dispatch: Dispatch<ProductCreateActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST
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

      const { data } = await axios.post(`${BASE_URL}/products`, productData, config);

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data
      });
      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateProduct =
  (updatedProduct: ProductType) =>
  async (
    dispatch: Dispatch<ProductUpdateActionType | ProductDetailsActionType>,
    getState: () => StateType
  ) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST
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
        `${BASE_URL}/products/${updatedProduct.productId}`,
        updatedProduct,
        config
      );

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data
      });
      // // update the state everywhere
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
      });
      // for Sidebar input map
      const { data: allProductList } = await axios.get(
        `${BASE_URL}/products?pageSize=${localStorage.getItem('totalProductCount')}`
      );
      localStorage.setItem('allProductsList', JSON.stringify(allProductList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const uploadProductImage =
  (
    productId: number,
    mode: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
      
    imageAddress: string = ''
  ) =>
  async (dispatch: Dispatch<ProductImageUploadActionType>, getState: () => StateType) => {
    // mode: 'file_upload' or 'add_image_url'
    let imageUrl = imageAddress || '';

    try {
      dispatch({
        type: PRODUCT_IMAGE_UPLOAD_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      if (mode === 'file_upload') {
        // Case file upload
        const file = (event.target as HTMLInputElement).files?.[0];
        const formData = new FormData();
        formData.append('image', file!);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const uploadedImageURL = await axios.post(
          `${BASE_URL}/products/images/upload`,
          formData,
          config
        );

        imageUrl = uploadedImageURL.data;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/products/${productId}/images`,
        { imageUrl },
        config
      );

      dispatch({
        type: PRODUCT_IMAGE_UPLOAD_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_IMAGE_UPLOAD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listProductImages =
  (productId: number) => async (dispatch: Dispatch<ProductImagesListActionType>) => {
    try {
      dispatch({ type: PRODUCT_IMAGES_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/products/${productId}/images`);

      dispatch({
        type: PRODUCT_IMAGES_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_IMAGES_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deleteProductImage =
  (productImageId: number) =>
  async (dispatch: Dispatch<ProductImageDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: PRODUCT_IMAGE_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/products/${productImageId}/images`, config);

      dispatch({
        type: PRODUCT_IMAGE_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_IMAGE_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const setImageAsMain =
  (productImageId: number) =>
  async (dispatch: Dispatch<ProductImageSetMainActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: PRODUCT_IMAGE_SET_MAIN_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.put(`${BASE_URL}/products/${productImageId}/images/main`, {}, config);

      dispatch({
        type: PRODUCT_IMAGE_SET_MAIN_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PRODUCT_IMAGE_SET_MAIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
