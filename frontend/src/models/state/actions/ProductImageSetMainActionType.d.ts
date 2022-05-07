
interface ProductImageSetMainActionRequest {
  type: 'PRODUCT_IMAGE_SET_MAIN_REQUEST';
}

interface ProductImageSetMainActionSuccess {
  type: 'PRODUCT_IMAGE_SET_MAIN_SUCCESS';
}
interface ProductImageSetMainActionError {
  type: 'PRODUCT_IMAGE_SET_MAIN_FAIL';
  payload: string;
}

type ProductImageSetMainActionType =
  | ProductImageSetMainActionRequest
  | ProductImageSetMainActionSuccess
  | ProductImageSetMainActionError;

export default ProductImageSetMainActionType;
