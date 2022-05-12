import ProductType from '../../ProductType';

interface ProductsListActionRequest {
  type: 'PRODUCT_LIST_REQUEST';
}

interface ProductsListActionSuccess {
  type: 'PRODUCT_LIST_SUCCESS';
  payload: ProductType[];
}
interface ProductsListActionError {
  type: 'PRODUCT_LIST_FAIL';
  payload: string;
}

type ProductsListActionType =
  | ProductsListActionRequest
  | ProductsListActionSuccess
  | ProductsListActionError;

export default ProductsListActionType;
