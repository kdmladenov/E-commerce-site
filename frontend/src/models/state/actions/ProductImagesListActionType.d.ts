import ProductImageType from '../../ProductImageType';

interface ProductImagesListActionRequest {
  type: 'PRODUCT_IMAGES_LIST_REQUEST';
}

interface ProductImagesListActionSuccess {
  type: 'PRODUCT_IMAGES_LIST_SUCCESS';
  payload: ProductImageType[];
}
interface ProductImagesListActionError {
  type: 'PRODUCT_IMAGES_LIST_FAIL';
  payload: string;
}

type ProductImagesListActionType =
  | ProductImagesListActionRequest
  | ProductImagesListActionSuccess
  | ProductImagesListActionError;

export default ProductImagesListActionType;
