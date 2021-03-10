require('dotenv').config()

module.exports = {
  DEV_DATABASE_NAME: process.env.DEV_DATABASE_NAME,
  DEV_DATABASE_PORT: +process.env.DEV_DATABASE_PORT || 5432,
  DEV_DATABASE_USERNAME: process.env.DEV_DATABASE_USERNAME || 'postgres',
  DEV_DATABASE_PASSWORD: process.env.DEV_DATABASE_PASSWORD,
  DEV_DATABASE_DIALECT: process.env.DEV_DATABASE_DIALECT || 'postgres',

  DEV_HOST_PORT: process.env.DEV_HOST_PORT,
  DEV_HOST_NAME: process.env.DEV_HOST_NAME,
}
