interface ProductRestoreActionRequest {
  type: 'PRODUCT_RESTORE_REQUEST';
}

interface ProductRestoreActionSuccess {
  type: 'PRODUCT_RESTORE_SUCCESS';
}
interface ProductRestoreActionError {
  type: 'PRODUCT_RESTORE_FAIL';
  payload: string;
}

type ProductRestoreActionType =
  | ProductRestoreActionRequest
  | ProductRestoreActionSuccess
  | ProductRestoreActionError;

export default ProductRestoreActionType;
