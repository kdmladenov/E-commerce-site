interface OrdersData {
  getAllByUser: Function;
  getAll: Function;
  getOrderBy: Function;
  createOrderWithoutItems: Function;
  createOrderItem: Function;
  getAllOrderItemsByOrder: Function;
  createOrderPaymentResult: Function;
  updateOrderPayment: Function;
  updateOrderDelivered: Function;
}

export default OrdersData;
