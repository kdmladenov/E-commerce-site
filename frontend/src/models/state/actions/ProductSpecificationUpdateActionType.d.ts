import SpecificationType from '../../SpecificationType';

interface ProductSpecificationUpdateActionRequest {
  type: 'PRODUCT_SPECIFICATION_UPDATE_REQUEST';
}

interface ProductSpecificationUpdateActionSuccess {
  type: 'PRODUCT_SPECIFICATION_UPDATE_SUCCESS';
  payload: SpecificationType;
}
interface ProductSpecificationUpdateActionError {
  type: 'PRODUCT_SPECIFICATION_UPDATE_FAIL';
  payload: string;
}
interface ProductSpecificationUpdateActionReset {
  type: 'PRODUCT_SPECIFICATION_UPDATE_RESET';
}

type ProductSpecificationUpdateActionType =
  | ProductSpecificationUpdateActionRequest
  | ProductSpecificationUpdateActionSuccess
  | ProductSpecificationUpdateActionError
  | ProductSpecificationUpdateActionReset;

export default ProductSpecificationUpdateActionType;
