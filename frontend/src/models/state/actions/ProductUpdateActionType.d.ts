import ProductType from '../../ProductType';

interface ProductUpdateActionRequest {
  type: 'PRODUCT_UPDATE_REQUEST';
}

interface ProductUpdateActionSuccess {
  type: 'PRODUCT_UPDATE_SUCCESS';
  payload: ProductType;
}
interface ProductUpdateActionError {
  type: 'PRODUCT_UPDATE_FAIL';
  payload: string;
}

interface ProductUpdateActionReset {
  type: 'PRODUCT_UPDATE_RESET';
}

type ProductUpdateActionType =
  | ProductUpdateActionRequest
  | ProductUpdateActionSuccess
  | ProductUpdateActionError
  | ProductUpdateActionReset;

export default ProductUpdateActionType;
