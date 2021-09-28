import rolesEnum from '../constants/roles.enum.js';
import db from './pool.js';

const getAllProducts = async (search, searchBy, sort, order, pageSize, page, role) => {
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(order) ? order : 'asc';
  const searchColumn = [
    'title',
    'brand',
    'description',
    'image',
    'productCategory',
    'price',
    'stockCount',
    'reviewCount',
    'rating'
  ].includes(searchBy)
    ? searchBy
    : 'title';
  const sortColumn = [
    'title',
    'brand',
    'description',
    'image',
    'productCategory',
    'price',
    'stockCount',
    'reviewCount',
    'rating'
  ].includes(sort)
    ? sort
    : 'title';
  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT 
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
      p.is_deleted as isDeleted
    FROM products p
    LEFT JOIN (SELECT count(product_id) as review_count, AVG(rating) as rating, product_id
                FROM reviews
                WHERE is_deleted = 0
                GROUP BY product_id) as r using (product_id)
    WHERE ${
      role === rolesEnum.basic ? ' is_deleted = 0 AND' : ''
    } ${searchColumn} Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
  `;

  return db.query(sql, [+pageSize, +offset]);
};

const getBy = async (column, value, role) => {
  const sql = `
    SELECT 
      p.product_id as productId,
      p.title,
      p.brand,
      p.description,
      p.image,
      p.product_category as productCategory,
      p.price,
      p.stock_count as stockCount,
      r.review_count as reviewCount,
      r.rating
    FROM products p
    LEFT JOIN (SELECT count(product_id) as review_count, AVG(rating) as rating, product_id
            FROM reviews
            WHERE is_deleted = 0
            GROUP BY product_id) as r using (product_id)
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (product) => {
  const sql = `
    INSERT INTO products (
      title,
      brand,
      image,
      description,
      product_category,
      price,
      stock_count
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    product.title,
    product.brand,
    product.image || null,
    product.description || '',
    product.product_category,
    +product.price,
    +product.stock_count
  ]);

  return getBy('product_id', result.insertId);
};

const update = async (updatedProduct) => {
  const sql = `
        UPDATE products
        SET
          title = ?,
          brand = ?,
          image = ?,
          description = ?,
          product_category = ?,
          price = ?,
          stock_count = ?
        WHERE product_id = ?
    `;

  const _ = await db.query(sql, [
    updatedProduct.title,
    updatedProduct.brand,
    updatedProduct.image,
    updatedProduct.description,
    updatedProduct.productCategory,
    +updatedProduct.price,
    +updatedProduct.stock_count,
    +updatedProduct.productId
  ]);

  return getBy('product_id', updatedProduct.productId);
};

const remove = async (productToDelete) => {
  const sql = `
        UPDATE products 
        SET is_deleted = true
        WHERE product_id = ?
    `;

  return db.query(sql, [productToDelete.productId]);
};

// NOT NEEDED
// const imageChange = (path, productId) => {
//   const sql = `
//     UPDATE products SET
//       image = ?
//     WHERE product_id = ?
//   `;

//   return db.query(sql, [path, productId]);
// };

export default {
  getAllProducts,
  getBy,
  create,
  update,
  remove,
  // imageChange
};
