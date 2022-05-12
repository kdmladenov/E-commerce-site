interface ProductDeleteActionRequest {
  type: 'PRODUCT_DELETE_REQUEST';
}

interface ProductDeleteActionSuccess {
  type: 'PRODUCT_DELETE_SUCCESS';
}
interface ProductDeleteActionError {
  type: 'PRODUCT_DELETE_FAIL';
  payload: string;
}

type ProductDeleteActionType =
  | ProductDeleteActionRequest
  | ProductDeleteActionSuccess
  | ProductDeleteActionError;

export default ProductDeleteActionType;
