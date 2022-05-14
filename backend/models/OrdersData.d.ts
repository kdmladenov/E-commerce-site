import OrderItemType from './OrderItemType';
import OrderType from './OrderType';

interface OrdersData {
  getAllByUser: (
    userId: number,
    role: RolesType,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<OrderType[]>;
  getAll: (search: string, sort: string, page: number, pageSize: number) => Promise<OrderType[]>;
  getOrderBy: (column: string, value: string | number, role: RolesType) => Promise<OrderType>;
  createOrderWithoutItems: (
    userId: number,
    address: string,
    address2: string,
    city: string,
    zip: string,
    state: string,
    country: string,
    paymentMethod: string,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number
  ) => Promise<OrderType>;
  createOrderItem: (
    title: string,
    qty: number,
    image: string,
    price: number,
    id: number,
    orderId: number,
    rating: number
  ) => Promise<OrderItemType>;
  getAllOrderItemsByOrder: (orderId: number) => Promise<OrderItemType[]>;
  createOrderPaymentResult: ({
    orderId,
    id,
    status,
    update_time,
    email_address
  }: Payment) => Promise<PaymentResultType>;
  updateOrderPayment: (orderId: number, paymentResultId: number) => Promise<any>;
  updateOrderDelivered: (orderId: number) => Promise<any>;
}

export default OrdersData;
