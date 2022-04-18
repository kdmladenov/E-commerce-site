import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';

const getAll = async (
  productId: number,
  search: string,
  sort: string,
  page: number,
  pageSize: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['dateCreated', 'rating', 'thumbsUp', 'thumbsDown'].includes(sortArr[0])
    ? sortArr[0]
    : 'date_created';
  const offset = (page - 1) * pageSize;

  const sql = `
  SELECT   
    q.question_id as questionId,
    q.product_id as productId,
    q.user_id as userId,
    q.question_content as questionContent,
    q.date_created as dateCreated,
    q.date_edited as dateEdited,
    u.avatar as avatar,
    u.full_name as fullName,
    ql.thumbs_up as thumbsUp,
    ql.thumbs_down as thumbsDown,
    ql.userThumbsUpList,
    ql.userThumbsDownList,
    ans.answers,
    COUNT(*) OVER () AS totalDBItems
    FROM questions q
    LEFT JOIN users u USING (user_id)
    LEFT JOIN (select question_id,
          count(if(reaction_id=1,1,null)) as thumbs_up,
          count(if(reaction_id=2,1,null)) as thumbs_down,
          GROUP_CONCAT(if(reaction_id=1,user_id,null)) as userThumbsUpList,
          GROUP_CONCAT(if(reaction_id=2,user_id,null)) as userThumbsDownList
          from questions_likes
          WHERE is_deleted = 0
          group by question_id) ql USING (question_id)
    LEFT JOIN (select a.question_id,
          JSON_ARRAYAGG(json_object(
          "answerId",a.answer_id, 
          "questionId",a.question_id,
          "userId",a.user_id,
          "fullName",u.full_name,
          "avatar",u.avatar,
          "answerContent", a.answer_content, 
          "dateCreated",a.date_created,
          "dateEdited",a.date_edited
          )) as answers
          FROM answers a
          LEFT JOIN users u USING (user_id)
          WHERE a.is_deleted = 0 
          group by question_id) ans USING (question_id)
    WHERE q.is_deleted = 0 AND q.product_id = ?  ${
      search
        ? `AND CONCAT_WS(',', q.question_content, u.full_name, ans.answers) Like '%${search}%'`
        : ''
    }
    ORDER BY ${sortColumn} ${direction}
    LIMIT ? OFFSET ?
    `;
  return db.query(sql, [+productId, +pageSize, +offset]);
};

const getBy = async (column: string, value: string | number, role: string) => {
  const sql = `
  SELECT
    q.product_id as productId,
    q.user_id as userId,
    q.question_id as questionId,
    q.question_content as questionContent,
    q.date_created as dateCreated,
    q.date_edited as dateEdited,
    u.avatar as avatar,
    u.full_name as fullName,
    ql.thumbs_up as thumbsUp,
    ql.thumbs_down as thumbsDown,
    ql.userThumbsUpList,
    ql.userThumbsDownList
    FROM questions q
    LEFT JOIN (select question_id,
    count(if(reaction_id=1,1,null)) as thumbs_up,
    count(if(reaction_id=2,1,null)) as thumbs_down,
    GROUP_CONCAT(if(reaction_id=1,user_id,null)) as userThumbsUpList,
    GROUP_CONCAT(if(reaction_id=2,user_id,null)) as userThumbsDownList
    from questions_likes
    WHERE is_deleted = 0
    group by question_id) ql USING (question_id)
    LEFT JOIN users u USING (user_id)
  WHERE ${column} = ? AND q.is_deleted = 0
  `;
  const result = await db.query(sql, [value]);

  return result[0];
};

const create = async (questionContent: string, userId: number, productId: number) => {
  const sql = `
    INSERT INTO questions (
      question_content,
      user_id,
      product_id
    )
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [questionContent, +userId, +productId]);

  return getBy('question_id', result.insertId, 'basic');
};

const update = async (
  questionContent: string,
  questionId: number,
  userId: number,
  role: string
) => {
  const sql = `
    UPDATE questions SET
      question_content = ?,
      date_edited = CURRENT_TIMESTAMP()
    WHERE question_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [questionContent, questionId, userId]);
};

const remove = async (questionId: number, userId: number, role: string) => {
  const sql = `
    UPDATE questions
    SET is_deleted = true
    WHERE question_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [questionId, userId, role]);
};

// Questions Votes(Likes)

const getVoteBy = async (column: string, value: string | number, userId: number) => {
  const sql = `
  SELECT 
    ql.user_id as userId,
    u.full_name as fullName,
    q.question_id as questionId,
    ra.reaction_id as reactionId,
    ra.reaction_name as reactionName
  FROM questions_likes ql
  LEFT JOIN users u USING(user_id)
  LEFT JOIN reactions ra USING(reaction_id)
  LEFT JOIN questions q USING(question_id)
  WHERE ${column} = ? AND ql.is_deleted = 0 AND ql.user_id = ?
  `;

  const result = await db.query(sql, [value, userId]);

  return result[0];
};

const createVote = async (reactionName: string, questionId: number, userId: number) => {
  const sql = `
    INSERT INTO questions_likes (
      reaction_id,
      question_id,
      user_id
    )
    VALUES ((SELECT reaction_id FROM reactions WHERE reaction_name = ?), ?, ?)
  `;

  await db.query(sql, [reactionName, questionId, userId]);

  return getVoteBy('question_id', questionId, userId);
};

const updateVote = async (reactionName: string, questionId: number, userId: number) => {
  const sql = `
        UPDATE questions_likes 
        SET reaction_id  = (SELECT reaction_id FROM reactions WHERE reaction_name = ?)
        WHERE question_id = ? AND user_id = ?
    `;

  await db.query(sql, [reactionName, questionId, userId]);

  return getVoteBy('question_id', questionId, userId);
};

const removeVote = async (questionId: number, userId: number) => {
  const sql = `
        UPDATE questions_likes 
        SET is_deleted  = 1
        WHERE question_id = ? AND user_id = ?
    `;

  db.query(sql, [+questionId, +userId]);

  return;
};

export default {
  getAll,
  getBy,
  create,
  update,
  remove,
  getVoteBy,
  createVote,
  updateVote,
  removeVote
};
