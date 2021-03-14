require('dotenv/config.js')

module.exports = {
  ENV: process.env.ENV,

  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PORT: +process.env.DATABASE_PORT || 5432,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',

  HOST_PORT: process.env.HOST_PORT,
  HOST_NAME: process.env.HOST_NAME,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,

  MAIL_NAME: process.env.MAIL_NAME,
  MAIL_PORT: +process.env.MAIL_PORT || 587,
  MAIL_SECURE: process.env.MAIL_SECURE || false,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,

  REDIS_NAME: process.env.REDIS_NAME || '127.0.0.1',
  REDIS_PORT: +process.env.REDIS_PORT || 6379,

  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
}
