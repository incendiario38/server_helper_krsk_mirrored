require('dotenv').config();

let path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

let config = {
  root: rootPath,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      dialectOptions: {
        ssl: true
      }
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: 900,
    refreshSecret:  process.env.JWT_REFRESH_SECRET || 'refreshSecretKey',
    refreshExpiresIn: 86400
  }
};

module.exports = config;