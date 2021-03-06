import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import RolesType from '../models/RolesType.js';

const getAll = async (
  productId: number,
  search: string,
  sort: string,
  page: number,
  pageSize: number,
  ratingMin: number,
  ratingMax: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['dateCreated', 'rating', 'thumbsUp', 'thumbsDown'].includes(sortArr[0])
    ? sortArr[0]
    : 'date_created';
  const offset = (page - 1) * pageSize;

  const sql = `
    SELECT
    r.product_id as productId,
    r.user_id as userId,
    r.review_id as reviewId,
    r.rating,
    r.content as content,
    r.date_created as dateCreated,
    r.date_edited as dateEdited,
    r.title as title,
    u.avatar as avatar,
    u.full_name as fullName,
    rl.thumbs_up as thumbsUp,
    rl.thumbs_down as thumbsDown,
    rl.userThumbsUpList,
    rl.userThumbsDownList,
    COUNT(*) OVER () AS totalDBItems
    FROM reviews r
    LEFT JOIN users u USING (user_id)
    LEFT JOIN (select review_id,
        count(if(reaction_id=1,1,null)) as thumbs_up,
        count(if(reaction_id=2,1,null)) as thumbs_down,
        GROUP_CONCAT(if(reaction_id=1,user_id,null)) as userThumbsUpList,
        GROUP_CONCAT(if(reaction_id=2,user_id,null)) as userThumbsDownList
        from review_likes
        WHERE is_deleted = 0
        group by review_id) rl USING (review_id)
    WHERE r.is_deleted = 0 AND r.product_id = ? AND r.rating BETWEEN ? AND ? AND (r.content Like '%${search}%' OR r.title Like '%${search}%' OR u.full_name Like '%${search}%')
    ORDER BY ${sortColumn} ${direction}
    LIMIT ? OFFSET ?
    `;
  return db.query(sql, [+productId, ratingMin, ratingMax, pageSize, offset]);
};

const getBy = async (column: string, value: string | number, role: RolesType = rolesEnum.basic) => {
  const sql = `
  SELECT
    r.product_id as productId,
    r.user_id as userId,
    r.review_id as reviewId,
    r.rating,
    r.content as content,
    r.date_created as dateCreated,
    r.date_edited as dateEdited,
    r.title as title,
    u.avatar as avatar,
    u.full_name as fullName,
    rl.thumbs_up as thumbsUp,
    rl.thumbs_down as thumbsDown,
    rl.userThumbsUpList,
    rl.userThumbsDownList
    FROM reviews r
    LEFT JOIN users u USING (user_id)
    LEFT JOIN (select review_id,
        count(if(reaction_id=1,1,null)) as thumbs_up,
        count(if(reaction_id=2,1,null)) as thumbs_down,
        GROUP_CONCAT(if(reaction_id=1,user_id,null)) as userThumbsUpList,
        GROUP_CONCAT(if(reaction_id=2,user_id,null)) as userThumbsDownList
        from review_likes
        WHERE is_deleted = 0
        group by review_id) rl USING (review_id)
  WHERE ${column} = ? ${role === rolesEnum.basic ? 'AND r.is_deleted = 0' : ''}
  `;
  const result = await db.query(sql, [value]);

  return result[0];
};

// const getBy = async (column, value, role) => {
//   const sql = `
//   SELECT
//     review_id as reviewId,
//     product_id as productId,
//     user_id as userId,
//     title,
//     content,
//     rating,
//     date_created as dateCreated,
//     date_edited as dateEdited
//   FROM reviews
//   WHERE ${column} = ? ${role === rolesEnum.basic ? 'AND is_deleted = 0' : ''}
//   `;
//   const result = await db.query(sql, [value]);

//   return result[0];
// };

const create = async (
  content: string,
  userId: number,
  productId: number,
  rating: number,
  title: string
) => {
  const sql = `
    INSERT INTO reviews (
      content,
      user_id,
      product_id,
      rating,
      title
    )
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [content, +userId, +productId, +rating, title]);

  return getBy('review_id', result.insertId, 'basic');
};

const update = async (
  content: string,
  reviewId: number,
  userId: number,
  role: RolesType,
  rating: number,
  title: string
) => {
  const sql = `
    UPDATE reviews SET
      title = ?,
      content = ?,
      rating = ?,
      date_edited = CURRENT_TIMESTAMP()
    WHERE review_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [title, content, rating, reviewId, userId]);
};

const remove = async (reviewId: number, userId: number, role: RolesType) => {
  const sql = `
    UPDATE reviews
    SET is_deleted = true
    WHERE review_id = ? ${role === rolesEnum.basic ? 'AND user_id = ?' : ''}
  `;
  return db.query(sql, [reviewId, userId, role]);
};

const getReviewByUserAndProduct = async (userId: number, productId: number) => {
  const sql = `
    SELECT
      review_id as reviewId,
      product_id as productId,
      user_id as userId,
      title as productTitle,
      content, 
      date_created as dateCreated,
      date_edited as dateEdited
    FROM reviews
    WHERE is_deleted = 0 AND user_id = ? AND product_id = ?
  `;
  const result = await db.query(sql, [userId, productId]);

  return result[0];
};

// Reviews Votes(Likes)

const getVoteBy = async (column: string, value: string | number, userId: number) => {
  const sql = `
  SELECT 
    rl.user_id as userId,
    u.full_name as fullName,
    r.review_id as reviewId,
    ra.reaction_id as reactionId,
    ra.reaction_name as reactionName
  FROM review_likes rl
  LEFT JOIN users u USING(user_id)
  LEFT JOIN reactions ra USING(reaction_id)
  LEFT JOIN reviews r USING(review_id)
  WHERE ${column} = ? AND rl.is_deleted = 0 AND rl.user_id = ?
  `;

  const result = await db.query(sql, [value, userId]);

  return result[0];
};

const createVote = async (reactionName: string, reviewId: number, userId: number) => {
  const sql = `
    INSERT INTO review_likes (
      reaction_id,
      review_id,
      user_id
    )
    VALUES ((SELECT reaction_id FROM reactions WHERE reaction_name = ?), ?, ?)
  `;

  await db.query(sql, [reactionName, reviewId, userId]);

  return getVoteBy('review_id', reviewId, userId);
};

const updateVote = async (reactionName: string, reviewId: number, userId: number) => {
  const sql = `
        UPDATE review_likes 
        SET reaction_id  = (SELECT reaction_id FROM reactions WHERE reaction_name = ?)
        WHERE review_id = ? AND user_id = ?
    `;

  await db.query(sql, [reactionName, reviewId, userId]);

  return getVoteBy('review_id', reviewId, userId);
};

const removeVote = async (reviewId: number, userId: number) => {
  const sql = `
        UPDATE review_likes 
        SET is_deleted  = 1
        WHERE review_id = ? AND user_id = ?
    `;

  db.query(sql, [+reviewId, +userId]);

  return;
};

export default {
  getAll,
  getBy,
  create,
  update,
  remove,
  getReviewByUserAndProduct,
  getVoteBy,
  createVote,
  updateVote,
  removeVote
};
