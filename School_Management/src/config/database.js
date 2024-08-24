
const { Sequelize } = require("sequelize");
const config = require("../config/config.json")["development"];

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
