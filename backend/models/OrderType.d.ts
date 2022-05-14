import OrderItemType from './OrderItemType';
import ShippingAddressFullType from './ShippingAddressFullType';

interface OrderType {
  orderId: number;
  userId: number;
  fullName: string;
  email: string;
  shippingAddress: string | ShippingAddressFullType;
  shippingAddress2: string;
  shippingCity: string;
  shippingZip: string;
  shippingState: string;
  shippingCountry: string;
  paymentMethod: string;
  paymentResultId: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: number;
  paymentDate: number;
  isDelivered: number;
  orderDate: string;
  deliveryDate: string;
  totalDBItems: number;
  orderItems: OrderItemType[];
}

export default OrderType;
