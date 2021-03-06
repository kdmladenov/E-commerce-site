import filterQueryHandler from '../helpers/filterQueryHandler.js';
import db from './pool.js';

const getAllHistory = async (
  userId: number,
  search: string,
  filter: string | string[],
  sort: string,
  pageSize: number,
  page: number
) => {
  const sortArr = sort?.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'desc';
  const sortColumn = [
    'price',
    'rating',
    'dateVisited',
    'salesCount',
    'visitedCount',
    'wishedCount'
  ].includes(sortArr[0])
    ? sortArr[0]
    : 'dateVisited';
  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT
      h.browsing_history_id as historyId,
      h.date_visited as dateVisited,
      h.user_id as userId,
      h.is_deleted as isDeleted,
      p.product_id as productId,
      p.title,
      p.image,
      p.description,
      p.brand,
      p.product_category as productCategory,
      p.price,
      p.stock_count as stockCount,
      p.model_number as modelNumber,
      p.sku,
      p.release_year as releaseYear,
      p.date_created as dateCreated,
      p.color,
      p.color_family as colorFamily,
      p.weight,
      p.dimensions,
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
    FROM browsing_history h
    LEFT JOIN (SELECT *
            FROM products
            GROUP BY product_id) as p using (product_id)
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
    LEFT JOIN (select product_id,
            count(if(rating=1,1,null)) as starOne,
            count(if(rating=2,1,null)) as starTwo,
            count(if(rating=3,1,null)) as starThree,
            count(if(rating=4,1,null)) as starFour,
            count(if(rating=5,1,null)) as starFive
            from reviews
            WHERE is_deleted = 0
            group by product_id) rt USING (product_id)
    WHERE h.is_deleted = 0 AND h.user_id = ? ${(filter || search) && ' AND '} ${
    search
      ? `CONCAT_WS(',', p.title, p.description, p.brand, p.product_category, p.model_number, p.sku, p.release_year, p.color, p.color_family, s.display_type, s.processor_brand,
      s.processor_model, s.processor_model_number, s.storage_type, s.graphics_type, s.graphics_brand, s.graphics_model, s.operating_system, s.voice_assistant, 
      s.battery_type) Like '%${search}%'`
      : ''
  } ${filter && search && ' AND '}${Array.isArray(filter) ? filterQueryHandler(filter) : filter}
    ORDER BY ${sortColumn} ${direction}
    LIMIT ? OFFSET ?
    `;

  return db.query(sql, [+userId, +pageSize, +offset]);
};

const getBy = async (column: string, value: string | number, userId: number) => {
  
  const sql = `
    SELECT 
      browsing_history_id as historyId,
      product_id as productId,
      user_id as userId,
      date_visited as dateVisited
    FROM browsing_history
    WHERE ${column} = ? AND user_id = ? AND is_deleted = 0
  `;

  const result = await db.query(sql, [+value, +userId]);
  return result[0];
};

const getById = async (historyId: number) => {
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

const create = async (productId: number, userId: number) => {
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

const remove = async (historyId: number) => {
  const sql = `
        UPDATE browsing_history
        SET is_deleted = true
        WHERE browsing_history_id = ?
    `;

  return db.query(sql, [+historyId]);
};

const updateDate = async (historyId: number) => {
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
