import dotenv from 'dotenv';

const config = dotenv.config().parsed;

export const DB_CONFIG = {
  host: config.HOST,
  port: config.DBPORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  adminEmail: config.ADMIN_EMAIL_ADDRESS,
  adminEmailPassword: config.ADMIN_EMAIL_PASSWORD
};

export const { PORT, PRIVATE_KEY, PAYPAL_CLIENT_ID } = config;
