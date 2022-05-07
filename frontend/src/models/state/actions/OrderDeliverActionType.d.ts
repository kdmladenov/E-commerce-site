
interface OrderDeliverActionRequest {
  type: 'ORDER_DELIVER_REQUEST';
}
interface OrderDeliverActionSuccess {
  type: 'ORDER_DELIVER_SUCCESS';
}
interface OrderDeliverActionError {
  type: 'ORDER_DELIVER_FAIL';
  payload: string;
}
interface OrderDeliverActionReset {
  type: 'ORDER_DELIVER_RESET';
}

type OrderDeliverActionType =
  | OrderDeliverActionRequest
  | OrderDeliverActionSuccess
  | OrderDeliverActionError
  | OrderDeliverActionReset;

export default OrderDeliverActionType;
