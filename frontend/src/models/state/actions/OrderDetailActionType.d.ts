import OrderType from '../../OrderType';

interface OrderDetailsActionRequest {
  type: 'ORDER_DETAILS_REQUEST';
}
interface OrderDetailsActionSuccess {
  type: 'ORDER_DETAILS_SUCCESS';
  payload: OrderType;
}
interface OrderDetailsActionError {
  type: 'ORDER_DETAILS_FAIL';
  payload: string;
}

type OrderDetailsActionType =
  | OrderDetailsActionRequest
  | OrderDetailsActionSuccess
  | OrderDetailsActionError;

export default OrderDetailsActionType;
