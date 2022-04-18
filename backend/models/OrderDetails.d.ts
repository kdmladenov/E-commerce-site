interface OrderDetails {
  orderId: number;
  userId: number;
  fullName: string;
  email: string;
  shippingAddress: string;
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
}

export default OrderDetails;
