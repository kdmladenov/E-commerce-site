import rolesEnum from '../constants/roles.enum.js';
import db from './pool.js';

const getBy = async (column, value, isProfileOwner, role) => {
  const sql = `
    SELECT 
      user_id as userId, 
      full_name as fullName,
      role,
      avatar
      ${
        role === 'admin' || isProfileOwner
          ? `,address ,
          address2,
          city,
          zip,
          state,
          country,
          email,
          phone`
          : ''
      }
    FROM users
    WHERE ${role === 'admin' ? `` : `is_deleted = 0 AND`} ${column} = ?
  `;

  const result = await db.query(sql, value);

  return result[0];
};

const getAll = async (search, searchBy, sort, order, page, pageSize, role) => {
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(order) ? order : 'asc';
  const searchColumn = [
    'user_id',
    'full_name',
    'address',
    'address2',
    'city',
    'zip',
    'state',
    'country',
    'email',
    'phone'
  ].includes(searchBy)
    ? searchBy
    : 'full_name';
  const sortColumn = [
    'user_id',
    'full_name',
    'address',
    'address2',
    'city',
    'zip',
    'state',
    'country',
    'email',
    'phone'
  ].includes(sort)
    ? sort
    : 'full_name';
  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
    SELECT
      user_id as userId, 
      full_name as fullName,
      role,
      avatar
      ${
        role === rolesEnum.admin
          ? `,address ,
          address2,
          city,
          zip,
          state,
          country,
          email,
          phone`
          : ''
      }
    FROM users
    WHERE ${
      role === rolesEnum.basic ? ' is_deleted = 0 AND' : ''
    } ${searchColumn} Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
  `;

  return db.query(sql, [pageSize, offset]);
};

const create = async (user) => {
  const sql = `
    INSERT INTO users (
      password, 
      email,
      full_name,
      avatar,
      phone,
      address,
      address2,
      city,
      zip,
      state,
      country,
      role
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await db.query(sql, [
    user.password,
    user.email,
    user.fullName,
    user?.avatar || null,
    user?.phone || null,
    user.address,
    user?.address2 || null,
    user.city,
    user.zip,
    user.state,
    user.country,
    user?.role || 'basic'
  ]);

  return getBy('user_id', result.insertId, true);
};

// const updateData = async (user) => {
//   const sql = `
//     UPDATE users SET
//       first_name = ?,
//       last_name = ?,
//       gender_id = (SELECT gender_id FROM gender WHERE gender = ?),
//       birth_date = ?,
//       email = ?,
//       phone = ?
//     WHERE user_id = ?
//   `;

//   return db.query(sql, [
//     user.firstName,
//     user.lastName,
//     user.gender,
//     user.birthDate,
//     user.email,
//     user.phone,
//     user.userId,
//   ]);
// };

// const remove = async userId => {
//   const sql = `
//     UPDATE users SET
//       is_deleted = 1,
//       username = 'DELETED USER',
//       email = 'DELETED USER EMAIL'
//     WHERE user_id = ?
//   `;

//   return db.query(sql, [userId]);
// };

const loginUser = async (email) => {
  const sql = `
    SELECT 
      email, 
      password,
      user_id as userId,
      role
    FROM users
    WHERE is_deleted = 0 AND email = ?
  `;

  const result = await db.query(sql, [email]);
  return result[0];
};

// tokens table includes blacklisted tokens only
const logoutUser = async (token) => {
  const sql = `
    INSERT INTO tokens (
      token
    )
    VALUES( ? )
  `;
  return db.query(sql, [token]);
};

// const avatarChange = (userId, path) => {
//   const sql = `
//     UPDATE users SET
//       avatar = ?
//     WHERE user_id = ?
//   `;

//   return db.query(sql, [path, userId]);
// };

// const getAvatar = async (userId) => {
//   const sql = `
//     SELECT avatar, username
//     FROM users
//     WHERE user_id = ${userId}
//   `;

//   const result = await db.query(sql, []);
//   return result[0];
// };


export default {
  getBy,
  getAll,
  create,
  // updateData,
  // remove,
  loginUser,
  logoutUser,
  // avatarChange,
  // getAvatar
};
