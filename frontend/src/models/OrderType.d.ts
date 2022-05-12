import OrderItemType from './OrderItemType';

interface OrderType {
  orderId: number;
  userId: number;
  fullName: string;
  email: string;
  shippingAddress?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingZip?: string;
  shippingState?: string;
  shippingCountry?: string;
  paymentMethod: string;
  paymentResultId: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: number;
  paymentDate: string;
  isDelivered: number;
  orderDate: string;
  deliveryDate: string;
  totalDBItems: number;
  orderItems: OrderItemType[];
}
export default OrderType;
