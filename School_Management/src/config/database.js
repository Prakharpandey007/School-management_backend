
const {Sequelize}=require('sequelize');
const config = require("../config/config.json")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  process.env.DATABASE || config.database,
  process.env.USERNAME || config.username,
  process.env.PASSWORD || config.password,
  {
    host: process.env.HOST || config.host,
    port: process.env.PORT || config.port || 3306,
    dialect: process.env.DIALECT || config.dialect,
  }
);
