import OrderType from '../../OrderType';

interface OrderMyListActionRequest {
  type: 'ORDER_MY_LIST_REQUEST';
}
interface OrderMyListActionSuccess {
  type: 'ORDER_MY_LIST_SUCCESS';
  payload: OrderType[];
}
interface OrderMyListActionError {
  type: 'ORDER_MY_LIST_FAIL';
  payload: string;
}
interface OrderMyListActionReset {
  type: 'ORDER_MY_LIST_RESET';
}

type OrderMyListActionType =
  | OrderMyListActionRequest
  | OrderMyListActionSuccess
  | OrderMyListActionError
  | OrderMyListActionReset;

export default OrderMyListActionType;
