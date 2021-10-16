import rolesEnum from '../constants/roles.enum.js';
import db from './pool.js';

const getAll = async (productId) => {

  const sql = `
    SELECT
    q.product_id as productId,
    q.user_id as userId,
    q.question_id as questionId,
    q.question_content as questionContent,
    q.date_created as dateCreated,
    q.date_edited as dateEdited,
    u.avatar as avatar,
    u.full_name as fullName
    FROM questions q
    LEFT JOIN users u USING (user_id)
    WHERE q.is_deleted = 0 AND q.product_id = ?
    ORDER BY q.date_created desc
    `;
  return db.query(sql, [+productId]);
};

const getBy = async (column, value, role) => {
  const sql = `
  SELECT
    q.product_id as productId,
    q.user_id as userId,
    q.question_id as questionId,
    q.question_content as questionContent,
    q.date_created as dateCreated,
    q.date_edited as dateEdited,
    u.avatar as avatar,
    u.full_name as fullName
    FROM questions q
    LEFT JOIN users u USING (user_id)
  WHERE ${column} = ? AND q.is_deleted = 0
  `;
  const result = await db.query(sql, [value]);

  return result[0];
};

const create = async (questionContent, userId, productId) => {
  const sql = `
    INSERT INTO questions (
      question_content,
      user_id,
      product_id
    )
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [questionContent, +userId, +productId]);

  return getBy('question_id', result.insertId);
};

const update = async (questionContent, questionId, userId, role) => {
  const sql = `
    UPDATE questions SET
      question_content = ?,
      date_edited = CURRENT_TIMESTAMP()
    WHERE question_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [questionContent, questionId, userId]);
};

const remove = async (questionId, userId, role) => {
  const sql = `
    UPDATE questions
    SET is_deleted = true
    WHERE question_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [questionId, userId, role]);
};

export default {
  getAll,
  getBy,
  create,
  update,
  remove
};
