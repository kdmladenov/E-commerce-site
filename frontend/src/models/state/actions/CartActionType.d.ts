import CartItemType from '../../CartItemType';
import AddressType from '../../AddressType';

interface CartAddAction {
  type: 'CART_ADD_ITEM';
  payload: CartItemType;
}
interface CartItemUpdateQtyAction {
  type: 'CART_ITEM_UPDATE_QTY';
  payload: CartItemType;
}
interface CartRemoveItemAction {
  type: 'CART_REMOVE_ITEM';
  payload: number;
}
interface CartSaveShippingAddressAction {
  type: 'CART_SAVE_SHIPPING_ADDRESS';
  payload: AddressType;
}
interface CartSavePaymentMethodAction {
  type: 'CART_SAVE_PAYMENT_METHOD';
  payload: string;
}
interface CartRemoveAllItemsAction {
  type: 'CART_REMOVE_ALL_ITEMS';
}

type CartActionType =
  | CartAddAction
  | CartItemUpdateQtyAction
  | CartRemoveItemAction
  | CartSaveShippingAddressAction
  | CartSavePaymentMethodAction
  | CartRemoveAllItemsAction;

export default CartActionType;
