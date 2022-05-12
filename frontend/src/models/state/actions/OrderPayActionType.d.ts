import OrderType from '../../OrderType';

interface OrderPayActionRequest {
  type: 'ORDER_PAY_REQUEST';
}
interface OrderPayActionSuccess {
  type: 'ORDER_PAY_SUCCESS';
  payload: OrderType;
}
interface OrderPayActionError {
  type: 'ORDER_PAY_FAIL';
  payload: string;
}
interface OrderPayActionReset {
  type: 'ORDER_PAY_RESET';
}

type OrderPayActionType =
  | OrderPayActionRequest
  | OrderPayActionSuccess
  | OrderPayActionError
  | OrderPayActionReset;

export default OrderPayActionType;
