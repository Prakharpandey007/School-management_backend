
const { Sequelize } = require("sequelize");
const config = require("../config/config.json")[process.env.NODE_ENV];

const sequelize = new Sequelize(
    config.database,    // Database name
    config.username,    // Username
    config.password,    // Password
  {
    host: config.host,  // Host
    dialect: config.dialect,  // Dialect
  }
);

module.exports = sequelize;
