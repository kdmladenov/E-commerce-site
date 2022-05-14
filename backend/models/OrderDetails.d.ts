import OrderItemType from './OrderItemType';
import ShippingAddressFullType from './ShippingAddressFullType';

interface OrderDetails {
  orderId: number;
  orderItems: OrderItemType[];
  shippingAddress: {
    address: string;
    address2: string;
    city: string;
    zip: string;
    state: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export default OrderDetails;
