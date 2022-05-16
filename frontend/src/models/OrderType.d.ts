import OrderItemType from './OrderItemType';

interface OrderType {
  orderId: number;
  userId: number;
  fullName: string;
  email: string;
  address?: string;
  address2?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
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
