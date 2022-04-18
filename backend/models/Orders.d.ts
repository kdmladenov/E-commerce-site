interface Orders {
  orderId: number;
  orderItems: { title; qty; image; price; productId }[];
  shippingAddress: { address; address2; city; zip; state; country };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export default Orders;
