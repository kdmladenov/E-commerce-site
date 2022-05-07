import OrderType from '../../OrderType';

interface OrderCreateActionRequest {
  type: 'ORDER_CREATE_REQUEST';
}
interface OrderCreateActionSuccess {
  type: 'ORDER_CREATE_SUCCESS';
  payload: OrderType;
}
interface OrderCreateActionError {
  type: 'ORDER_CREATE_FAIL';
  payload: string;
}
interface OrderCreateActionReset {
  type: 'ORDER_CREATE_RESET';
}

type OrderCreateActionType =
  | OrderCreateActionRequest
  | OrderCreateActionSuccess
  | OrderCreateActionError
  | OrderCreateActionReset;

export default OrderCreateActionType;
