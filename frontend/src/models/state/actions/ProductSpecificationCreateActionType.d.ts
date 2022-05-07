import SpecificationType from '../../SpecificationType';

interface ProductSpecificationCreateActionRequest {
  type: 'PRODUCT_SPECIFICATION_CREATE_REQUEST';
}

interface ProductSpecificationCreateActionSuccess {
  type: 'PRODUCT_SPECIFICATION_CREATE_SUCCESS';
  payload: SpecificationType;
}
interface ProductSpecificationCreateActionError {
  type: 'PRODUCT_SPECIFICATION_CREATE_FAIL';
  payload: string;
}
interface ProductSpecificationCreateActionReset {
  type: 'PRODUCT_SPECIFICATION_CREATE_RESET';
}

type ProductSpecificationCreateActionType =
  | ProductSpecificationCreateActionRequest
  | ProductSpecificationCreateActionSuccess
  | ProductSpecificationCreateActionError
  | ProductSpecificationCreateActionReset;

export default ProductSpecificationCreateActionType;
