import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
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
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS
} from '../constants/productConstants';
import ProductCreateActionType from '../../models/state/actions/ProductCreateActionType';
import ProductUpdateActionType from '../../models/state/actions/ProductUpdateActionType';
import ProductImageUploadActionType from '../../models/state/actions/ProductImageUploadActionType';
import ProductImagesListActionType from '../../models/state/actions/ProductImagesListActionType';
import ProductImageDeleteActionType from '../../models/state/actions/ProductImageDeleteActionType';
import ProductImageSetMainActionType from '../../models/state/actions/ProductImageSetMainActionType';
import ProductDetailsActionType from '../../models/state/actions/ProductDetailsActionType';
import ProductRestoreActionType from '../../models/state/actions/ProductRestoreActionType';
import ProductDeleteActionType from '../../models/state/actions/ProductDeleteActionType';
import ProductsListActionType from '../../models/state/actions/ProductsListActionType';

export const productListReducer = (state = { products: [] }, action: ProductsListActionType) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {} },
  action: ProductDetailsActionType
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action: ProductDeleteActionType) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productRestoreReducer = (state = {}, action: ProductRestoreActionType) => {
  switch (action.type) {
    case PRODUCT_RESTORE_REQUEST:
      return { loading: true };
    case PRODUCT_RESTORE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_RESTORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action: ProductCreateActionType) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action: ProductUpdateActionType) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productImageUploadReducer = (state = {}, action: ProductImageUploadActionType) => {
  switch (action.type) {
    case PRODUCT_IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case PRODUCT_IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productImagesListReducer = (
  state = { productImages: [] },
  action: ProductImagesListActionType
) => {
  switch (action.type) {
    case PRODUCT_IMAGES_LIST_REQUEST:
      return { loading: true, productImages: [] };
    case PRODUCT_IMAGES_LIST_SUCCESS:
      return { loading: false, productImages: action.payload };
    case PRODUCT_IMAGES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productImageDeleteReducer = (state = {}, action: ProductImageDeleteActionType) => {
  switch (action.type) {
    case PRODUCT_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productImageSetMainReducer = (state = {}, action: ProductImageSetMainActionType) => {
  switch (action.type) {
    case PRODUCT_IMAGE_SET_MAIN_REQUEST:
      return { loading: true };
    case PRODUCT_IMAGE_SET_MAIN_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_IMAGE_SET_MAIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
