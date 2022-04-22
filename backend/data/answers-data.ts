import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import RolesType from '../models/RolesType.js';

const getAll = async (questionId: number) => {
  const sql = `
    SELECT
    a.question_id as questionId,
    a.user_id as userId,
    a.answer_id as answerId,
    a.answer_content as answerContent,
    a.date_created as dateCreated,
    a.date_edited as dateEdited,
    u.avatar as avatar,
    u.full_name as fullName
    FROM answers a
    LEFT JOIN users u USING (user_id)
    WHERE a.is_deleted = 0 AND a.question_id = ?
    ORDER BY a.date_created desc
    `;
  return db.query(sql, [+questionId]);
};

const getBy = async (column: string, value: string | number, role: RolesType) => {
  const sql = `
  SELECT
    a.question_id as questionId,
    a.user_id as userId,
    a.answer_id as answerId,
    a.answer_content as answerContent,
    a.date_created as dateCreated,
    a.date_edited as dateEdited,
    u.avatar as avatar,
    u.full_name as fullName
    FROM answers a
    LEFT JOIN users u USING (user_id)
  WHERE ${column} = ? AND a.is_deleted = 0
  `;
  const result = await db.query(sql, [value]);

  return result[0];
};

const create = async (answerContent: string, userId: number, questionId: number) => {
  const sql = `
    INSERT INTO answers (
      answer_content,
      user_id,
      question_id
    )
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [answerContent, +userId, +questionId]);

  return getBy('answer_id', result.insertId, 'basic');
};

const update = async (
  answerContent: string,
  answerId: number,
  userId: number,
  role: RolesType
) => {
  const sql = `
    UPDATE answers SET
      answer_content = ?,
      date_edited = CURRENT_TIMESTAMP()
    WHERE answer_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [answerContent, answerId, userId]);
};

const remove = async (answerId: number, userId: number, role: RolesType) => {
  const sql = `
    UPDATE answers
    SET is_deleted = true
    WHERE answer_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [answerId, userId, role]);
};

export default {
  getAll,
  getBy,
  create,
  update,
  remove
};
