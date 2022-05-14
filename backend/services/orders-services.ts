import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import OrdersData from '../models/OrdersData.js';
import Payment from '../models/Payment.js';
import OrderType from '../models/OrderType.js';
import OrderDetails from '../models/OrderDetails.js';
import RolesType from '../models/RolesType.js';

const addOrderItems = (ordersData: OrdersData) => async (data: OrderDetails, userId: number) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = data;

  const { address, address2, city, zip, state, country } = shippingAddress;

  const createdOrderWithoutItems = await ordersData.createOrderWithoutItems(
    userId,
    address,
    address2,
    city,
    zip,
    state,
    country,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  );

  orderItems.forEach(async (item) => {
    const { title, qty, image, price, productId, rating } = item;

    await ordersData.createOrderItem(
      title,
      qty,
      image,
      price,
      productId,
      createdOrderWithoutItems.orderId,
      rating
    );
  });

  const orderItemsCreated = await ordersData.getAllOrderItemsByOrder(
    createdOrderWithoutItems.orderId
  );

  return {
    error: null,
    order: { orderItemsCreated, ...createdOrderWithoutItems }
  };
};

const getOrderById =
  (ordersData: OrdersData) => async (orderId: number, role: RolesType, userId: number) => {
    const orderWithoutItems = await ordersData.getOrderBy('order_id', orderId, role);

    if (!orderWithoutItems) {
      return {
        error: errors.RECORD_NOT_FOUND,
        order: null
      };
    }
    // The user is not admin or has created the order
    if (orderWithoutItems.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    const orderItemsCreated = await ordersData.getAllOrderItemsByOrder(orderId);

    return {
      error: null,
      order: { orderItemsCreated, ...orderWithoutItems }
    };
  };

const updateOrderToPaid =
  (ordersData: OrdersData) =>
  async (orderId: number, role: RolesType, userId: number, paymentData: Payment) => {
    const orderWithoutItems = await ordersData.getOrderBy('order_id', orderId, role);

    if (!orderWithoutItems) {
      return {
        error: errors.RECORD_NOT_FOUND,
        order: null
      };
    }
    // The user is not admin or has created the order
    if (orderWithoutItems.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    const orderItemsCreated = await ordersData.getAllOrderItemsByOrder(orderId);

    const paymentResult = await ordersData.createOrderPaymentResult({
      orderId,
      id: paymentData.id,
      status: paymentData.status,
      update_time: paymentData.update_time,
      email_address: paymentData.payer.email_address
    });
    await ordersData.updateOrderPayment(orderId, paymentResult.paymentResultId);

    const updatedOrderWithoutItems = await ordersData.getOrderBy('order_id', orderId, role);

    return {
      error: null,
      order: { orderItemsCreated, paymentResult, ...updatedOrderWithoutItems }
    };
  };

const updateOrderToDelivered = (ordersData: OrdersData) => async (orderId: number) => {
  const orderWithoutItems = await ordersData.getOrderBy('order_id', +orderId, 'admin');

  if (!orderWithoutItems) {
    return {
      error: errors.RECORD_NOT_FOUND,
      order: null
    };
  }

  const orderItems = await ordersData.getAllOrderItemsByOrder(orderId);

  await ordersData.updateOrderDelivered(orderId);

  const updatedOrderWithoutItems = await ordersData.getOrderBy('order_id', +orderId, 'admin');

  return {
    error: null,
    order: { ...updatedOrderWithoutItems, orderItems }
  };
};

const getALLOrdersByUser =
  (ordersData: OrdersData) =>
  async (
    userId: number,
    role: RolesType,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => {
    const ordersWithoutItems = await ordersData.getAllByUser(
      userId,
      role,
      search,
      sort,
      page,
      pageSize
    );

    const ordersWithItems = await Promise.all(
      await ordersWithoutItems.map(async (order: OrderType) => {
        const orderItems = await Promise.all(
          await ordersData.getAllOrderItemsByOrder(order.orderId)
        );
        return { ...order, orderItems };
      })
    );

    return {
      orders: ordersWithItems
    };
  };

const getALLOrders =
  (ordersData: OrdersData) =>
  async (search: string, sort: string, page: number, pageSize: number) => {
    const ordersWithoutItems = await ordersData.getAll(search, sort, page, pageSize);
    const ordersWithItems = await Promise.all(
      await ordersWithoutItems.map(async (order: OrderType) => {
        const orderItems = await Promise.all(
          await ordersData.getAllOrderItemsByOrder(order.orderId)
        );
        return { ...order, orderItems };
      })
    );

    return {
      orders: ordersWithItems
    };
  };

export default {
  addOrderItems,
  getALLOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getALLOrdersByUser
};
