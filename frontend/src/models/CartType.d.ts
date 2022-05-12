import CartItemType from './CartItemType';

interface CartType {
  shippingAddress?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingZip?: string;
  shippingState?: string;
  shippingCountry?: string;
  cartItems: CartItemType[];
  paymentMethod: string;
}
export default CartType;
