import rolesEnum from '../constants/roles.enum.js';
import db from './pool.js';

const getOrderBy = async (column, value, role) => {
  const sql = `
    SELECT
    o.order_id as orderId,
    o.user_id as userId,
    u.full_name as fullName,
    u.email,
    o.shipping_address as shippingAddress,
    o.shipping_address2 as shippingAddress2,
    o.shipping_city as shippingCity,
    o.shipping_zip as shippingZip,
    o.shipping_state as shippingState,
    o.shipping_country as shippingCountry,
    o.payment_method as paymentMethod,
    o.payment_result_id as paymentResultId,
    o.items_price as itemsPrice,
    o.shipping_price as shippingPrice,
    o.tax_price as taxPrice,
    o.total_price as totalPrice,
    o.is_paid as isPaid,
    o.payment_date as paymentDate,
    o.is_delivered as isDelivered,
    o.delivery_date as deliveryDate
    FROM orders o
    LEFT JOIN (SELECT
      user_id,
      full_name,
      email
      FROM users) as u using(user_id)
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const createOrderWithoutItems = async (
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
) => {
  const sql = `
    INSERT INTO orders (
    user_id,
    shipping_address,
    shipping_address2,
    shipping_city,
    shipping_zip,
    shipping_state,
    shipping_country,
    payment_method,
    items_price,
    shipping_price,
    tax_price,
    total_price
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    userId,
    address,
    address2 || null,
    city,
    zip,
    state,
    country,
    paymentMethod,
    +itemsPrice,
    +shippingPrice,
    +taxPrice,
    +totalPrice
  ]);

  return getOrderBy('order_id', result.insertId);
};

const createOrderItem = async (title, qty, image, price, id, orderId) => {
  const sql = `
    INSERT INTO order_items (
    title, 
    quantity, 
    image, 
    price, 
    product_id, 
    order_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [title, +qty, image, +price, +id, +orderId]);

  return { order_item_id: result.insertId, title, qty, image, price, id, orderId };
};

const getAllOrderItemsByOrder = async (orderId) => {
  const sql = `
  SELECT
    order_item_id as orderItemId,
    title, 
    quantity as qty, 
    image, 
    price, 
    product_id as id, 
    order_id as orderId
    FROM order_items
    WHERE order_id = ?
  `;

  return db.query(sql, [+orderId]);
};



export default {
  getOrderBy,
  createOrderWithoutItems,
  createOrderItem,
  getAllOrderItemsByOrder
};
