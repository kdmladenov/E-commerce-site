import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import Payment from '../models/Payment.js';
import RolesType from '../models/RolesType.js';

const getAllByUser = async (
  userId: number,
  role: RolesType,
  search: string,
  sort: string,
  page: number,
  pageSize: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'desc';
  const sortColumn = ['order_id', 'order_date', 'total_price'].includes(sortArr[0])
    ? sortArr[0]
    : 'order_date';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT
    o.order_id as orderId,
    o.user_id as userId,
    u.full_name as fullName,
    u.email,
    o.shipping_address as address,
    o.shipping_address2 as address2,
    o.shipping_city as city,
    o.shipping_zip as zip,
    o.shipping_state as state,
    o.shipping_country as country,
    o.payment_method as paymentMethod,
    o.payment_result_id as paymentResultId,
    o.items_price as itemsPrice,
    o.shipping_price as shippingPrice,
    o.tax_price as taxPrice,
    o.total_price as totalPrice,
    o.is_paid as isPaid,
    o.payment_date as paymentDate,
    o.is_delivered as isDelivered,
    o.order_date as orderDate,
    o.delivery_date as deliveryDate,
    COUNT(*) OVER () AS totalDBItems
    FROM orders o
    LEFT JOIN (SELECT
      user_id,
      full_name,
      email
      FROM users) as u using(user_id)
    WHERE user_id = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''} ${
    search.length > 0
      ? `AND CONCAT_WS(',', order_id, shipping_address, shipping_address2, shipping_city, shipping_zip, shipping_state, shipping_country)`
      : 'AND order_id '
  } Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?;
  `;

  return db.query(sql, [+userId, +pageSize, +offset]);
};

const getAll = async (search: string, sort: string, page: number, pageSize: number) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'desc';
  const sortColumn = ['order_id', 'order_date', 'total_price'].includes(sortArr[0])
    ? sortArr[0]
    : 'order_date';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT
    o.order_id as orderId,
    o.user_id as userId,
    u.full_name as fullName,
    u.email,
    o.shipping_address as address,
    o.shipping_address2 as address2,
    o.shipping_city as city,
    o.shipping_zip as zip,
    o.shipping_state as state,
    o.shipping_country as country,
    o.payment_method as paymentMethod,
    o.payment_result_id as paymentResultId,
    o.items_price as itemsPrice,
    o.shipping_price as shippingPrice,
    o.tax_price as taxPrice,
    o.total_price as totalPrice,
    o.is_paid as isPaid,
    o.payment_date as paymentDate,
    o.is_delivered as isDelivered,
    o.order_date as orderDate,
    o.delivery_date as deliveryDate,
    COUNT(*) OVER () AS totalDBItems
    FROM orders o
    LEFT JOIN (SELECT
      user_id,
      full_name,
      email
      FROM users) as u using(user_id)
    WHERE ${
      search.length > 0
        ? `CONCAT_WS(',', order_id, shipping_address, shipping_address2, shipping_city, shipping_zip, shipping_state, shipping_country)`
        : ' order_id '
    } Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
  `;

  return db.query(sql, [+pageSize, +offset]);
};

const getOrderBy = async (
  column: string,
  value: string | number,
  role: RolesType = rolesEnum.basic
) => {
  const sql = `
    SELECT
    o.order_id as orderId,
    o.user_id as userId,
    u.full_name as fullName,
    u.email,
    o.shipping_address as address,
    o.shipping_address2 as address2,
    o.shipping_city as city,
    o.shipping_zip as zip,
    o.shipping_state as state,
    o.shipping_country as country,
    o.payment_method as paymentMethod,
    o.payment_result_id as paymentResultId,
    o.items_price as itemsPrice,
    o.shipping_price as shippingPrice,
    o.tax_price as taxPrice,
    o.total_price as totalPrice,
    o.is_paid as isPaid,
    o.payment_date as paymentDate,
    o.is_delivered as isDelivered,
    o.order_date as orderDate,
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

  return getOrderBy('order_id', result.insertId, 'basic');
};

const createOrderItem = async (
  title: string,
  qty: number,
  image: string,
  price: number,
  id: number,
  orderId: number,
  rating: number
) => {
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

  return {
    orderItemId: +result.insertId,
    title,
    qty,
    image,
    price,
    productId: id,
    orderId,
    rating
  };
};

const getAllOrderItemsByOrder = async (orderId: number) => {
  const sql = `
  SELECT
    oi.order_item_id as orderItemId,
    oi.title, 
    oi.quantity as qty, 
    oi.image, 
    oi.price, 
    oi.product_id as productId, 
    oi.order_id as orderId,
    p.brand,
    p.stock_count as stockCount,
    r.review_count as reviewCount,
    r.rating
    FROM order_items oi
    LEFT JOIN (SELECT
      product_id,
      description,
      brand,
      stock_count
      FROM products) as p using(product_id)
    LEFT JOIN (SELECT 
      count(product_id) as review_count, 
      AVG(rating) as rating, 
      product_id
      FROM reviews
      WHERE is_deleted = 0
      GROUP BY product_id) as r using (product_id)
    WHERE order_id = ?
  `;

  return db.query(sql, [+orderId]);
};

const createOrderPaymentResult = async ({
  orderId,
  id,
  status,
  update_time,
  email_address
}: Payment) => {
  const sql = `
    INSERT INTO payment_result (
      order_id, 
      id, 
      status, 
      update_time, 
      email_address
    )
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [+orderId, id, status, update_time, email_address]);

  return {
    paymentResultId: result.insertId,
    orderId,
    id,
    status,
    updateTime: update_time,
    emailAddress: email_address
  };
};

const updateOrderPayment = async (orderId: number, paymentResultId: number) => {
  const sql = `
    UPDATE orders SET
      payment_result_id = ?,
      is_paid = 1,
      payment_date = ?
    WHERE order_id = ?
  `;

  return db.query(sql, [+paymentResultId, new Date(), +orderId]);
};

const updateOrderDelivered = async (orderId: number) => {
  const sql = `
    UPDATE orders SET
      is_delivered = 1,
      delivery_date = ?
    WHERE order_id = ?
  `;

  return db.query(sql, [new Date(), +orderId]);
};

export default {
  getAllByUser,
  getAll,
  getOrderBy,
  createOrderWithoutItems,
  createOrderItem,
  getAllOrderItemsByOrder,
  createOrderPaymentResult,
  updateOrderPayment,
  updateOrderDelivered
};
