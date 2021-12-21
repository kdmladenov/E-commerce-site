import db from './pool.js';

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

const getBy = async (column, value, role = 'basic') => {
  const sql = `
    SELECT 
      features_id as featuresId,
      product_id as productId,
      feature_title as featureTitle,
      feature_content as featureContent
    FROM features 
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (productId, data) => {
  const sql = `
    INSERT INTO features (
      product_id,
      feature_title,
      feature_content
    )
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [
    +productId,
    data.featureTitle,
    data.featureContent
  ]);

  return getBy('feature_id', result.insertId);
};

const update = async (updatedFeature) => {
  const sql = `
        UPDATE features
        SET
          product_id = ?,
          feature_title = ?,
          feature_content = ?
        WHERE feature_id = ?
    `;

  const _ = await db.query(sql, [
    +updatedFeature.productId,
    updatedFeature.featureTitle,
    updatedFeature.featureContent,
    +updatedFeature.featureId
  ]);

  return getBy('feature_id', updatedFeature.featureId);
};

const remove = async (featuresData) => {
  const sql = `
        UPDATE features 
        SET is_deleted = true
        WHERE feature_id = ?
    `;

  return db.query(sql, [featuresData.featureId]);
};

export default {
  getFeatures,
  getBy,
  create,
  update,
  remove  
};
