interface OrderCreateType {
  orderItems: { title: string; qty: number; image: string; price: number; productId: number }[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingAddress?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingZip?: string;
  shippingState?: string;
  shippingCountry?: string;
}
export default OrderCreateType;
