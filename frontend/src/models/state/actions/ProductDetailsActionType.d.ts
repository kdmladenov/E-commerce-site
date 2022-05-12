import ProductType from '../../ProductType';

interface ProductDetailsActionRequest {
  type: 'PRODUCT_DETAILS_REQUEST';
}

interface ProductDetailsActionSuccess {
  type: 'PRODUCT_DETAILS_SUCCESS';
  payload: ProductType;
}
interface ProductDetailsActionError {
  type: 'PRODUCT_DETAILS_FAIL';
  payload: string;
}

type ProductDetailsActionType =
  | ProductDetailsActionRequest
  | ProductDetailsActionSuccess
  | ProductDetailsActionError;

export default ProductDetailsActionType;
