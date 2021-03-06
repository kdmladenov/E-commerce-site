import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import Image from '../models/Image.js';
import RolesType from '../models/RolesType.js';

const getProductImageBy = async (
  column: string,
  value: string | number,
  role: RolesType = 'basic'
) => {
  const sql = `
      SELECT 
        product_image_id as productImageId,
        product_id as productId,
        image,
        is_main as isMain,
        is_deleted as isDeleted
      FROM product_images 
      WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const addProductImage = async (productId: number, imageUrl: string, isMain: number = 0) => {
  const sql = `
    INSERT INTO product_images (
      product_id,
      image,
      is_main
    )
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [+productId, imageUrl, +isMain]);

  return { productId, productImageId: result.insertId, image: imageUrl, isMain };
};

const getAllProductImages = async (productId: number) => {
  const sql = `
      SELECT 
        product_image_id as productImageId,
        product_id as productId,
        image,
        is_main as isMain,
        is_deleted as isDeleted
      FROM product_images 
      WHERE product_id = ? AND is_deleted = 0
      `;

  return db.query(sql, [+productId]);
};

const remove = async (productImageId: number) => {
  const sql = `
        UPDATE product_images 
        SET is_deleted = true
        WHERE product_image_id = ?
    `;

  return db.query(sql, [+productImageId]);
};

const update = async (updatedProductImage: Image) => {
  const sql = `
        UPDATE product_images
        SET
          product_id = ?,
          image = ?,
          is_main = ?
        WHERE product_image_id = ?
    `;

  const _ = await db.query(sql, [
    +updatedProductImage.productId || null,
    updatedProductImage.image || null,
    updatedProductImage.isMain || 0,
    +updatedProductImage.productImageId || null
  ]);

  return getProductImageBy('product_image_id', +updatedProductImage.productImageId);
};

export default {
  getProductImageBy,
  addProductImage,
  getAllProductImages,
  remove,
  update
};
