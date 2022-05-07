interface ProductSpecificationDeleteActionRequest {
  type: 'PRODUCT_SPECIFICATION_DELETE_REQUEST';
}
interface ProductSpecificationDeleteActionSuccess {
  type: 'PRODUCT_SPECIFICATION_DELETE_SUCCESS';
}
interface ProductSpecificationDeleteActionError {
  type: 'PRODUCT_SPECIFICATION_DELETE_FAIL';
  payload: string;
}

type ProductSpecificationDeleteActionType =
  | ProductSpecificationDeleteActionRequest
  | ProductSpecificationDeleteActionSuccess
  | ProductSpecificationDeleteActionError;

export default ProductSpecificationDeleteActionType;
