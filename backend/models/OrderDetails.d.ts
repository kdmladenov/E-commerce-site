interface OrderDetails {
  orderId: number;
  orderItems: { title: string; qty: number; image: string; price: number; productId: number }[];
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
