import ProductType from '../../ProductType';

interface ProductCreateActionRequest {
  type: 'PRODUCT_CREATE_REQUEST';
}

interface ProductCreateActionSuccess {
  type: 'PRODUCT_CREATE_SUCCESS';
  payload: ProductType;
}
interface ProductCreateActionError {
  type: 'PRODUCT_CREATE_FAIL';
  payload: string;
}

interface ProductCreateActionReset {
  type: 'PRODUCT_CREATE_RESET';
}

type ProductCreateActionType =
  | ProductCreateActionRequest
  | ProductCreateActionSuccess
  | ProductCreateActionError
  | ProductCreateActionReset;

export default ProductCreateActionType;
