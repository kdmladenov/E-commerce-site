import CartItemType from './CartItemType';

interface CartType {
  address?: string;
  address2?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  cartItems: CartItemType[];
  paymentMethod: string;
}
export default CartType;
