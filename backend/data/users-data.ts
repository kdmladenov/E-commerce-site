import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import User from '../models/User.js';

const getBy = async (column: string, value: string, isProfileOwner: boolean, role: string) => {
  const sql = `
    SELECT 
      user_id as userId, 
      full_name as fullName,
      role,
      avatar
      ${
        role === 'admin' || isProfileOwner
          ? `,email ,
        address,
        address2,
        city,
        zip,
        state,
        country,
        phone`
          : ''
      }
    FROM users
    WHERE ${role === 'admin' ? `` : `is_deleted = 0 AND`} ${column} = ?
  `;

  const result = await db.query(sql, value);

  return result[0];
};

const getAll = async (
  search: string,
  sort: string,
  page: number,
  pageSize: number,
  role: string
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['user_id', 'full_name', 'email'].includes(sortArr[0])
    ? sortArr[0]
    : 'user_id';

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
          phone,
          is_deleted as isDeleted `
          : ''
      },
      COUNT(*) OVER () AS totalDBItems
    FROM users
    WHERE ${role === rolesEnum.basic ? ' is_deleted = 0 AND ' : ''} ${
    search.length > 0
      ? `CONCAT_WS(',', user_id, full_name ${role === rolesEnum.admin && `, email`}
      )`
      : ' full_name '
  } Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
    `;

  return db.query(sql, [+pageSize, +offset]);
};

const create = async (user: User) => {
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
    user?.role || rolesEnum.basic
  ]);

  return getBy('user_id', result.insertId, true, 'basic');
};

const updateData = async (user: User) => {
  const sql = `
    UPDATE users SET
      full_name = ?,
      email = ?,
      avatar = ?,
      phone = ?,
      address = ?,
      address2 = ?,
      city = ?,
      zip = ?,
      state = ?,
      country = ?,
      role = ?
    WHERE user_id = ?
  `;

  return db.query(sql, [
    user.fullName,
    user.email,
    user.avatar,
    user.phone,
    user.address,
    user.address2,
    user.city,
    user.zip,
    user.state,
    user.country,
    user.role,
    user.userId
  ]);
};

const getPasswordBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT password
    FROM users
    WHERE ${column} = ?
  `;
  const result = await db.query(sql, [value]);
  return result[0];
};

const updatePassword = async (userId: number, password: string) => {
  const sql = `
  UPDATE users SET  
    password = ?
  WHERE user_id = ?
  `;
  return db.query(sql, [password, userId]);
};

const remove = async (userId: number) => {
  const sql = `
    UPDATE users SET
      is_deleted = 1
    WHERE user_id = ?
  `;

  return db.query(sql, [userId]);
};

const restore = async (userId: number) => {
  const sql = `
    UPDATE users SET
      is_deleted = 0
    WHERE user_id = ?
  `;

  return db.query(sql, [userId]);
};

const loginUser = async (email: string) => {
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
const logoutUser = async (token: string) => {
  const sql = `
    INSERT INTO tokens (
      token
    )
    VALUES( ? )
  `;
  return db.query(sql, [token]);
};

export default {
  getBy,
  getAll,
  create,
  updateData,
  remove,
  restore,
  loginUser,
  logoutUser,
  getPasswordBy,
  updatePassword
};
