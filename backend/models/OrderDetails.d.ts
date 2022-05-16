import OrderItemType from './OrderItemType';

interface OrderDetails {
  orderId: number;
  address: string;
  address2: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  orderItems: OrderItemType[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export default OrderDetails;
