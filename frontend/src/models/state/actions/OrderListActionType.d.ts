import OrderType from '../../OrderType';

interface OrderListActionRequest {
  type: 'ORDER_LIST_REQUEST';
}
interface OrderListActionSuccess {
  type: 'ORDER_LIST_SUCCESS';
  payload: OrderType[];
}
interface OrderListActionError {
  type: 'ORDER_LIST_FAIL';
  payload: string;
}

type OrderListActionType = OrderListActionRequest | OrderListActionSuccess | OrderListActionError;

export default OrderListActionType;
