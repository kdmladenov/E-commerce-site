interface ProductFeaturesDeleteActionRequest {
  type: 'PRODUCT_FEATURE_DELETE_REQUEST';
}
interface ProductFeaturesDeleteActionSuccess {
  type: 'PRODUCT_FEATURE_DELETE_SUCCESS';
}
interface ProductFeaturesDeleteActionError {
  type: 'PRODUCT_FEATURE_DELETE_FAIL';
  payload: string;
}

type ProductFeaturesDeleteActionType =
  | ProductFeaturesDeleteActionRequest
  | ProductFeaturesDeleteActionSuccess
  | ProductFeaturesDeleteActionError;

export default ProductFeaturesDeleteActionType;
