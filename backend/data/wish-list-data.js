import db from './pool.js';

const getAllWishListRecords = async (
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
    'wishListId',
    'dateCreated',
    'title',
    'brand',
    'description',
    'productCategory'
  ].includes(sort)
    ? sort
    : 'dateCreated';
  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT
      w.wishlist_id as wishListId,
      w.date_created as dateCreated,
      w.user_id as userId,
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
      rt.starOne,
      rt.starTwo,
      rt.starThree,
      rt.starFour,
      rt.starFive,
      p.is_deleted as isProductDeleted
    FROM wishlist w
    LEFT JOIN (SELECT product_id, title, brand, description, image, product_category, price, stock_count, is_deleted 
            FROM products
            GROUP BY product_id) as p using (product_id)
    LEFT JOIN (SELECT count(product_id) as review_count, AVG(rating) as rating, product_id
                FROM reviews
                WHERE is_deleted = 0
                GROUP BY product_id) as r using (product_id)
    LEFT JOIN (select product_id,
        count(if(rating=1,1,null)) as starOne,
        count(if(rating=2,1,null)) as starTwo,
        count(if(rating=3,1,null)) as starThree,
        count(if(rating=4,1,null)) as starFour,
        count(if(rating=5,1,null)) as starFive
        from reviews
        WHERE is_deleted = 0
        group by product_id) rt USING (product_id)
    WHERE w.is_deleted = 0 AND ${searchColumn} Like '%${search}%' AND w.user_id = ?
    ${
      dateRangeLow && dateRangeHigh
        ? `AND w.date_created BETWEEN "${dateRangeLow}" AND "${dateRangeHigh}"`
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
      wishlist_id as wishListId,
      product_id as productId,
      user_id as userId,
      date_created as dateCreated
    FROM wishlist
    WHERE ${column} = ? AND user_id = ? AND is_deleted = 0
  `;

  const result = await db.query(sql, [value, +userId]);
  return result[0];
};

const getById = async (wishListId) => {
  const sql = `
    SELECT 
      wishlist_id as wishListId,
      product_id as productId,
      user_id as userId,
      date_created as dateCreated
    FROM wishlist
    WHERE wishlist_id = ? AND is_deleted = 0
  `;

  const result = await db.query(sql, [+wishListId]);
  return result[0];
};

const create = async (productId, userId) => {
  const sql = `
    INSERT INTO wishlist (
      product_id,
      user_id
    )
    VALUES (?, ?)
  `;
  const result = await db.query(sql, [+productId, +userId]);

  return getById(result.insertId);
};

const remove = async (wishListId) => {
  const sql = `
        UPDATE wishlist
        SET is_deleted = true
        WHERE wishlist_id = ?
    `;

  return db.query(sql, [+wishListId]);
};

export default {
  getAllWishListRecords,
  getById,
  getBy,
  create,
  remove
};
