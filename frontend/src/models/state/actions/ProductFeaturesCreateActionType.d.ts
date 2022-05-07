import FeatureType from '../../FeatureType';

interface ProductFeaturesCreateActionRequest {
  type: 'PRODUCT_FEATURE_CREATE_REQUEST';
}

interface ProductFeaturesCreateActionSuccess {
  type: 'PRODUCT_FEATURE_CREATE_SUCCESS';
  payload: FeatureType;
}
interface ProductFeaturesCreateActionError {
  type: 'PRODUCT_FEATURE_CREATE_FAIL';
  payload: string;
}
interface ProductFeaturesCreateActionReset {
  type: 'PRODUCT_FEATURE_CREATE_RESET';
}

type ProductFeaturesCreateActionType =
  | ProductFeaturesCreateActionRequest
  | ProductFeaturesCreateActionSuccess
  | ProductFeaturesCreateActionError
  | ProductFeaturesCreateActionReset;

export default ProductFeaturesCreateActionType;
