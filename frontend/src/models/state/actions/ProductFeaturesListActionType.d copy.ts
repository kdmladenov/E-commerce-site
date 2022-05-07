import FeatureType from '../../FeatureType';

interface ProductFeaturesListActionRequest {
  type: 'PRODUCT_FEATURES_LIST_REQUEST';
}

interface ProductFeaturesListActionSuccess {
  type: 'PRODUCT_FEATURES_LIST_SUCCESS';
  payload: FeatureType[];
}
interface ProductFeaturesListActionError {
  type: 'PRODUCT_FEATURES_LIST_FAIL';
  payload: string;
}

type ProductFeaturesListActionType =
  | ProductFeaturesListActionRequest
  | ProductFeaturesListActionSuccess
  | ProductFeaturesListActionError;

export default ProductFeaturesListActionType;
