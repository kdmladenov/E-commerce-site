import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import ProductType from '../models/ProductType.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';

const getAllProducts = async (
  search: string,
  filter: string | string[],
  sort: string,
  pageSize: number,
  page: number,
  role: RolesType
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = [
    'price',
    'rating',
    'dateCreated',
    'productId',
    'salesCount',
    'visitedCount',
    'wishedCount'
  ].includes(sortArr[0])
    ? sortArr[0]
    : 'price';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT 
      p.product_id as productId,
      p.title,
      i.image,
      p.description,
      p.brand,
      p.product_category as productCategory,
      p.price,
      p.stock_count as stockCount,
      p.is_deleted as isDeleted,
      p.model_number as modelNumber,
      p.sku,
      p.release_year as releaseYear,
      p.date_created as dateCreated,
      p.color,
      p.color_family as colorFamily,
      p.weight,
      p.dimensions,
      p.discount,
      s.specification_id as specificationId,
      s.screen_size as screenSize,
      s.screen_resolution as screenResolution,
      s.display_type as displayType,
      s.touch_screen as touchScreen,
      s.processor_brand as processorBrand,
      s.processor_model as processorModel,
      s.processor_model_number as processorModelNumber,
      s.storage_type as storageType,
      s.storage_capacity as storageCapacity,
      s.system_memory as systemMemory,
      s.graphics_type as graphicsType,
      s.graphics_brand as graphicsBrand,
      s.graphics_model as graphicsModel,
      s.operating_system as operatingSystem,
      s.voice_assistant as voiceAssistant,
      s.battery_type as batteryType,
      s.backlit_keyboard as backlitKeyboard,
      IFNULL(o.sales_count, 0) as salesCount,
      IFNULL(h.visited_count, 0) as visitedCount,
      IFNULL(w.wished_count, 0) as wishedCount,
      r.review_count as reviewCount,
      r.rating,
      rt.starOne,
      rt.starTwo,
      rt.starThree,
      rt.starFour,
      rt.starFive,
      COUNT(*) OVER () AS totalDBItems
    FROM products p
    LEFT JOIN (SELECT count(product_id) as review_count, AVG(rating) as rating, product_id
        FROM reviews
        WHERE is_deleted = 0
        GROUP BY product_id) as r using (product_id)
    LEFT JOIN (SELECT sum(quantity) as sales_count,  product_id
        FROM order_items
        GROUP BY product_id) as o using (product_id)
    LEFT JOIN (SELECT count(product_id) as visited_count,  product_id
        FROM browsing_history
        WHERE is_deleted = 0
        GROUP BY product_id) as h using (product_id)
    LEFT JOIN (SELECT count(product_id) as wished_count,  product_id
        FROM wishlist
        WHERE is_deleted = 0
        GROUP BY product_id) as w using (product_id)
    LEFT JOIN (SELECT *
          FROM specifications) as s using (product_id)
    LEFT JOIN(SELECT *  FROM product_images
          WHERE is_main = 1 AND is_deleted = 0) as i using (product_id)
    LEFT JOIN (select product_id,
        count(if(rating=1,1,null)) as starOne,
        count(if(rating=2,1,null)) as starTwo,
        count(if(rating=3,1,null)) as starThree,
        count(if(rating=4,1,null)) as starFour,
        count(if(rating=5,1,null)) as starFive
        from reviews
        WHERE is_deleted = 0
        group by product_id) rt USING (product_id)
        ${
          role === rolesEnum.basic ? `WHERE p.is_deleted = 0 ${filter || search ? 'AND' : ''}` : ''
        } ${
    search
      ? `CONCAT_WS(',', p.title, p.description, p.brand, p.product_category, p.model_number, p.sku, p.release_year, p.color, p.color_family, s.display_type, s.processor_brand,
      s.processor_model, s.processor_model_number, s.storage_type, s.graphics_type, s.graphics_brand, s.graphics_model, s.operating_system, s.voice_assistant, 
      s.battery_type) Like '%${search}%'`
      : ''
  } ${filter && search && ' AND '}${Array.isArray(filter) ? filterQueryHandler(filter) : filter}
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  return db.query(sql, [+pageSize, +offset]);
};

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
    SELECT 
      p.product_id as productId,
      p.title,
      i.image,
      p.description,
      p.brand,
      p.product_category as productCategory,
      p.price,
      p.stock_count as stockCount,
      p.is_deleted as isDeleted,
      p.model_number as modelNumber,
      p.sku,
      p.release_year as releaseYear,
      p.date_created as dateCreated,
      p.color,
      p.color_family as colorFamily,
      p.weight,
      p.dimensions,
      p.discount,
      s.specification_id as specificationId,
      s.screen_size as screenSize,
      s.screen_resolution as screenResolution,
      s.display_type as displayType,
      s.touch_screen as touchScreen,
      s.processor_brand as processorBrand,
      s.processor_model as processorModel,
      s.processor_model_number as processorModelNumber,
      s.storage_type as storageType,
      s.storage_capacity as storageCapacity,
      s.system_memory as systemMemory,
      s.graphics_type as graphicsType,
      s.graphics_brand as graphicsBrand,
      s.graphics_model as graphicsModel,
      s.operating_system as operatingSystem,
      s.voice_assistant as voiceAssistant,
      s.battery_type as batteryType,
      s.backlit_keyboard as backlitKeyboard,
      IFNULL(o.sales_count, 0) as salesCount,
      IFNULL(h.visited_count, 0) as visitedCount,
      IFNULL(w.wished_count, 0) as wishedCount,
      r.review_count as reviewCount,
      r.rating,
      rt.starOne,
      rt.starTwo,
      rt.starThree,
      rt.starFour,
      rt.starFive
    FROM products p
    LEFT JOIN (SELECT count(product_id) as review_count, AVG(rating) as rating, product_id
            FROM reviews
            WHERE is_deleted = 0
            GROUP BY product_id) as r using (product_id)
    LEFT JOIN (SELECT sum(quantity) as sales_count,  product_id
        FROM order_items
        GROUP BY product_id) as o using (product_id)
    LEFT JOIN (SELECT count(product_id) as visited_count,  product_id
        FROM browsing_history
        WHERE is_deleted = 0
        GROUP BY product_id) as h using (product_id)
    LEFT JOIN (SELECT count(product_id) as wished_count,  product_id
        FROM wishlist
        WHERE is_deleted = 0
        GROUP BY product_id) as w using (product_id)
    LEFT JOIN (SELECT *
            FROM specifications) as s using (product_id)
    LEFT JOIN(SELECT *  FROM product_images
          WHERE is_main = 1 AND is_deleted = 0) as i using (product_id)
    LEFT JOIN (select product_id,
            count(if(rating=1,1,null)) as starOne,
            count(if(rating=2,1,null)) as starTwo,
            count(if(rating=3,1,null)) as starThree,
            count(if(rating=4,1,null)) as starFour,
            count(if(rating=5,1,null)) as starFive
            from reviews
            WHERE is_deleted = 0
            group by product_id) rt USING (product_id)
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND p.is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (product: ProductType) => {
  const sql = `
    INSERT INTO products (
      title,
      brand,
      image,
      description,
      product_category,
      price,
      stock_count,
      discount,
      color,
      color_family,
      dimensions,
      model_number,
      release_year,
      sku,
      weight
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    product.title,
    product.brand,
    product.image || 'storage/images/defaultImage.png',
    product.description,
    product.productCategory,
    +product.price,
    +product.stockCount,
    +product.discount,
    product.color,
    product.colorFamily,
    product.dimensions,
    product.modelNumber,
    +product.releaseYear,
    product.sku,
    +product.weight
  ]);

  return getBy('product_id', +result.insertId);
};

const update = async (updatedProduct: ProductType) => {
  const sql = `
        UPDATE products
        SET
          title = ?,
          brand = ?,
          description = ?,
          product_category = ?,
          price = ?,
          stock_count = ?,
          discount = ?,
          color = ?,
          color_family = ?,
          dimensions = ?,
          model_number = ?,
          release_year = ?,
          sku = ?,
          weight = ?
        WHERE product_id = ?
    `;

  await db.query(sql, [
    updatedProduct.title || null,
    updatedProduct.brand || null,
    updatedProduct.description || null,
    updatedProduct.productCategory || null,
    +updatedProduct.price || 0,
    +updatedProduct.stockCount || 0,
    +updatedProduct.discount || 0,
    updatedProduct.color || null,
    updatedProduct.colorFamily || null,
    updatedProduct.dimensions || null,
    updatedProduct.modelNumber || null,
    +updatedProduct.releaseYear || 2020,
    updatedProduct.sku || null,
    +updatedProduct.weight || 0,
    +updatedProduct.productId
  ]);

  return getBy('product_id', updatedProduct.productId);
};

const remove = async (productToDelete: ProductType) => {
  const sql = `
        UPDATE products 
        SET is_deleted = true
        WHERE product_id = ?
    `;

  return db.query(sql, [productToDelete.productId]);
};

const restore = async (productToRestore: ProductType) => {
  const sql = `
        UPDATE products 
        SET is_deleted = false
        WHERE product_id = ?
    `;

  return db.query(sql, [productToRestore.productId]);
};

export default {
  getAllProducts,
  getBy,
  create,
  update,
  remove,
  restore
};
