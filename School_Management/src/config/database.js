const { Sequelize } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

module.exports = sequelize;
