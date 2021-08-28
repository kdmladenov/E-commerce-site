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

export default {
  addOrderItems,
  getOrderById
};
