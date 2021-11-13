import db from './pool.js';

const getAllHistory = async (
  userId,
  search,
  searchBy,
  sort,
  order,
  pageSize,
  page,
  dateRangeLow,
  dateRangeHigh
) => {
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(order) ? order : 'desc';
  const searchColumn = ['title', 'brand', 'description', 'productCategory'].includes(searchBy)
    ? searchBy
    : 'title';

  const sortColumn = [
    'historyId',
    'dateVisited',
    'title',
    'brand',
    'description',
    'productCategory'
  ].includes(sort)
    ? sort
    : 'dateVisited';
  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT
      h.browsing_history_id as historyId,
      h.date_visited as dateVisited,
      h.user_id as userId,
      p.product_id as productId,
      p.title,
      p.brand,
      p.description,
      p.image,
      p.product_category as productCategory,
      p.price,
      r.review_count as reviewCount,
      p.stock_count as stockCount,
      r.rating,
      p.is_deleted as isProductDeleted
    FROM browsing_history h
    LEFT JOIN (SELECT product_id, title, brand, description, image, product_category, price, stock_count, is_deleted 
            FROM products
            GROUP BY product_id) as p using (product_id)
    LEFT JOIN (SELECT count(product_id) as review_count, AVG(rating) as rating, product_id
                FROM reviews
                WHERE is_deleted = 0
                GROUP BY product_id) as r using (product_id)
    WHERE h.is_deleted = 0 AND ${searchColumn} Like '%${search}%' AND h.user_id = ?
    ${
      dateRangeLow && dateRangeHigh
        ? `AND h.date_visited BETWEEN "${dateRangeLow}" AND "${dateRangeHigh}"`
        : ''
    }
    ORDER BY ${sortColumn} ${direction}
    LIMIT ? OFFSET ?
  `;

  return db.query(sql, [+userId, +pageSize, +offset]);
};

const getBy = async (column, value, userId) => {
  const sql = `
    SELECT 
      browsing_history_id as historyId,
      product_id as productId,
      user_id as userId,
      date_visited as dateVisited
    FROM browsing_history
    WHERE ${column} = ? AND user_id = ? AND is_deleted = 0
  `;

  const result = await db.query(sql, [value, +userId]);
  return result[0];
};

const getById = async (historyId) => {
  const sql = `
    SELECT 
      browsing_history_id as historyId,
      product_id as productId,
      user_id as userId,
      date_visited as dateVisited
    FROM browsing_history
    WHERE browsing_history_id = ? AND is_deleted = 0
  `;

  const result = await db.query(sql, [+historyId]);
  return result[0];
};

const create = async (productId, userId) => {
  const sql = `
    INSERT INTO browsing_history (
      product_id,
      user_id
    )
    VALUES (?, ?)
  `;
  const result = await db.query(sql, [+productId, +userId]);

  return getById(result.insertId);
};

const remove = async (historyId) => {
  const sql = `
        UPDATE browsing_history
        SET is_deleted = true
        WHERE browsing_history_id = ?
    `;

  return db.query(sql, [+historyId]);
};

const updateDate = async (historyId) => {
  const sql = `
        UPDATE browsing_history
        SET date_visited = CURRENT_TIMESTAMP()
        WHERE browsing_history_id = ?
    `;

  return db.query(sql, [+historyId]);
};

export default {
  getAllHistory,
  getById,
  getBy,
  create,
  remove,
  updateDate
};
