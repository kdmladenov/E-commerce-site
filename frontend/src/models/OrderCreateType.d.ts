interface OrderCreateType {
  orderItems: { title: string; qty: number; image: string; price: number; productId: number }[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentMethod: string;
  address?: string;
  address2?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
}
export default OrderCreateType;
