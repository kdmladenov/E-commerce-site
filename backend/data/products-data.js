import rolesEnum from '../constants/roles.enum.js';
import db from './pool.js';

const getBy = async (column, value, role) => {
  const sql = `
    SELECT 
      name,
      brand,
      description,
      image,
      product_category as productCategory,
      price,
      stock_count as stockCount,
      review_count as reviewCount,
      rating
    FROM products
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (product) => {
  console.log(product);
  const sql = `
    INSERT INTO products (
      name,
      brand,
      image,
      description,
      product_category,
      price,
      stock_count,
      review_count,
      rating
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    product.name,
    product.brand,
    product.image || null,
    product.product_category,
    product.description,
    +product.price,
    +product.stock_count,
    +product.review_count,
    +product.rating
  ]);

  return getBy('product_id', result.insertId);
};

export default {
  create,
  getBy
};
