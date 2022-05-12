import FeatureType from '../../FeatureType';

interface ProductFeaturesUpdateActionRequest {
  type: 'PRODUCT_FEATURE_UPDATE_REQUEST';
}

interface ProductFeaturesUpdateActionSuccess {
  type: 'PRODUCT_FEATURE_UPDATE_SUCCESS';
}
interface ProductFeaturesUpdateActionError {
  type: 'PRODUCT_FEATURE_UPDATE_FAIL';
  payload: string;
}
interface ProductFeaturesUpdateActionReset {
  type: 'PRODUCT_FEATURE_UPDATE_RESET';
}

type ProductFeaturesUpdateActionType =
  | ProductFeaturesUpdateActionRequest
  | ProductFeaturesUpdateActionSuccess
  | ProductFeaturesUpdateActionError
  | ProductFeaturesUpdateActionReset;

export default ProductFeaturesUpdateActionType;
