import rolesEnum from '../constants/roles.enum.js';
import db from './pool.js';

const getAllProducts = async (search, filter, sort, pageSize, page) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['price', 'rating', 'dateCreated', 'productId'].includes(sortArr[0])
    ? sortArr[0]
    : 'price';

  const offset = page ? (page - 1) * pageSize : 0;

  const whereClause = (filter) => {
    const queryMap = {};
    const filterLength = Array.isArray(filter) ? filter.length : 1;

    for (let i = 0; i < filterLength; i++) {
      const currQuery = Array.isArray(filter) ? filter[i] : filter;
      const currQueryKey = currQuery.split(' ')[0];
      if (!queryMap[currQueryKey]) queryMap[currQueryKey] = [];
      queryMap[currQueryKey].push(currQuery);
    }
    const resultString = Object.values(queryMap)
      .map((queryGroup) => (queryGroup.length > 1 ? `(${queryGroup.join(' OR ')})` : queryGroup[0]))
      .join(' AND ');

    return resultString;
  };

  const sql = `
  SELECT 
      p.product_id as productId,
      p.title,
      p.image,
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
      LEFT JOIN (SELECT *
            FROM specifications) as s using (product_id)
    LEFT JOIN (select product_id,
        count(if(rating=1,1,null)) as starOne,
        count(if(rating=2,1,null)) as starTwo,
        count(if(rating=3,1,null)) as starThree,
        count(if(rating=4,1,null)) as starFour,
        count(if(rating=5,1,null)) as starFive
        from reviews
        WHERE is_deleted = 0
        group by product_id) rt USING (product_id)
        ${(filter || search) && 'WHERE'} ${
    search
      ? `CONCAT_WS(',', p.title, p.description, p.brand, p.product_category, p.model_number, p.sku, p.release_year, p.color, p.color_family, s.display_type, s.processor_brand,
      s.processor_model, s.processor_model_number, s.storage_type, s.graphics_type, s.graphics_brand, s.graphics_model, s.operating_system, s.voice_assistant, 
      s.battery_type) Like '%${search}%'`
      : ''
  } ${filter && search && ' AND '}${Array.isArray(filter) ? whereClause(filter) : filter}
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  return db.query(sql, [+pageSize, +offset]);
};

const getBy = async (column, value, role = 'basic') => {
  const sql = `
    SELECT 
      p.product_id as productId,
      p.title,
      p.image,
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
    LEFT JOIN (SELECT *
            FROM specifications) as s using (product_id)
    LEFT JOIN (select product_id,
            count(if(rating=1,1,null)) as starOne,
            count(if(rating=2,1,null)) as starTwo,
            count(if(rating=3,1,null)) as starThree,
            count(if(rating=4,1,null)) as starFour,
            count(if(rating=5,1,null)) as starFive
            from reviews
            WHERE is_deleted = 0
            group by product_id) rt USING (product_id)
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
      stock_count,
      discount,
      color,
      color_family,
      dimensions,
      model_Number,
      release_year,
      sku,
      weight
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    product.title,
    product.brand,
    product.image || null,
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

  const _ = await db.query(sql, [
    updatedProduct.title || null,
    updatedProduct.brand || null,
    updatedProduct.image || null,
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

const remove = async (productToDelete) => {
  const sql = `
        UPDATE products 
        SET is_deleted = true
        WHERE product_id = ?
    `;

  return db.query(sql, [productToDelete.productId]);
};

const restore = async (productToRestore) => {
  const sql = `
        UPDATE products 
        SET is_deleted = false
        WHERE product_id = ?
    `;

  return db.query(sql, [productToRestore.productId]);
};

const getFeatures = async (productId) => {
  const sql = `
    SELECT 
      features_id as featuresId,
      product_id as productId,
      feature_title as featureTitle,
      feature_content as featureContent
    FROM features 
    WHERE product_id = ? AND is_deleted = 0
  `;

  return db.query(sql, [productId]);
};

export default {
  getAllProducts,
  getBy,
  create,
  update,
  remove,
  restore,
  getFeatures
};
