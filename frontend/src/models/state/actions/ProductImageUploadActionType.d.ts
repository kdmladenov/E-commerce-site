import ProductImageType from '../../ProductImageType';

interface ProductImageUploadActionRequest {
  type: 'PRODUCT_IMAGE_UPLOAD_REQUEST';
}

interface ProductImageUploadActionSuccess {
  type: 'PRODUCT_IMAGE_UPLOAD_SUCCESS';
  payload: ProductImageType;
}
interface ProductImageUploadActionError {
  type: 'PRODUCT_IMAGE_UPLOAD_FAIL';
  payload: string;
}

type ProductImageUploadActionType =
  | ProductImageUploadActionRequest
  | ProductImageUploadActionSuccess
  | ProductImageUploadActionError;

export default ProductImageUploadActionType;
