import { PRODUCT_SPECIFICATION_CREATE_FAIL, PRODUCT_SPECIFICATION_CREATE_REQUEST, PRODUCT_SPECIFICATION_CREATE_RESET, PRODUCT_SPECIFICATION_CREATE_SUCCESS, PRODUCT_SPECIFICATION_DELETE_FAIL, PRODUCT_SPECIFICATION_DELETE_REQUEST, PRODUCT_SPECIFICATION_DELETE_SUCCESS, PRODUCT_SPECIFICATION_UPDATE_FAIL, PRODUCT_SPECIFICATION_UPDATE_REQUEST, PRODUCT_SPECIFICATION_UPDATE_RESET, PRODUCT_SPECIFICATION_UPDATE_SUCCESS } from '../constants/productConstants';

export const productSpecificationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SPECIFICATION_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_SPECIFICATION_CREATE_SUCCESS:
      return { loading: false, success: true, productSpecification: action.payload };
    case PRODUCT_SPECIFICATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SPECIFICATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productSpecificationUpdateReducer = (state = { productSpecification: {} }, action) => {
  switch (action.type) {
    case PRODUCT_SPECIFICATION_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_SPECIFICATION_UPDATE_SUCCESS:
      return { loading: false, success: true, productSpecification: action.payload };
    case PRODUCT_SPECIFICATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SPECIFICATION_UPDATE_RESET:
      return { productSpecification: {} };
    default:
      return state;
  }
};

export const productSpecificationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SPECIFICATION_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_SPECIFICATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_SPECIFICATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
