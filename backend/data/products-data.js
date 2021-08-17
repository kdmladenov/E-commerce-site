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
  
  console.log(
    pageSize,
  );
  const sql = `
  SELECT 
      title,
      brand,
      description,
      image,
      product_category as productCategory,
      price,
      stock_count as stockCount,
      review_count as reviewCount,
      rating
    FROM products
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
      title,
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
      title,
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
    product.title,
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
  getAllProducts,
  getBy,
  create
};
