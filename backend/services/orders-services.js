import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';

const addOrderItems = (ordersData) => async (data, userId) => {
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
    const { title, qty, image, price, id } = item;

    await ordersData.createOrderItem(
      title,
      qty,
      image,
      price,
      id,
      createdOrderWithoutItems.orderId
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

const getOrderById = (ordersData) => async (orderId, role, userId) => {
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

const updateOrderToPaid = (ordersData) => async (orderId, role, userId, paymentData) => {
  const orderWithoutItems = await ordersData.getOrderBy('order_id', orderId, role, paymentData);

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

  const UpdatedOrderWithoutItems = await ordersData.getOrderBy(
    'order_id',
    orderId,
    role,
    paymentData
  );

  return {
    error: null,
    order: { orderItemsCreated, paymentResult, ...UpdatedOrderWithoutItems }
  };
};
const getALLOrdersByUser = (ordersData) => async (userId, role) => {
  const ordersWithoutItems = await ordersData.getAllByUser(userId, role);

  const ordersWithItems = await Promise.all(
    await ordersWithoutItems.map(async (order) => {
      const orderItems = await Promise.all(await ordersData.getAllOrderItemsByOrder(order.orderId));
      return { ...order, orderItems };
    })
  );

  return {
    orders: ordersWithItems
  };
};

export default {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getALLOrdersByUser
};
