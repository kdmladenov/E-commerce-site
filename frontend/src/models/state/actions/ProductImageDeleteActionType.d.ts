interface ProductImageDeleteActionRequest {
  type: 'PRODUCT_IMAGE_DELETE_REQUEST';
}

interface ProductImageDeleteActionSuccess {
  type: 'PRODUCT_IMAGE_DELETE_SUCCESS';
}
interface ProductImageDeleteActionError {
  type: 'PRODUCT_IMAGE_DELETE_FAIL';
  payload: string;
}

type ProductImageDeleteActionType =
  | ProductImageDeleteActionRequest
  | ProductImageDeleteActionSuccess
  | ProductImageDeleteActionError;

export default ProductImageDeleteActionType;
