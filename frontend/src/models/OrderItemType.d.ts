interface OrderItemType {
  orderItemId?: number;
  title: string;
  qty: number;
  image: string;
  price: number;
  productId: number;
  orderId?: number;
  brand?: string;
  stockCount?: number;
  reviewCount?: number;
  rating: number;
}
export default OrderItemType;
