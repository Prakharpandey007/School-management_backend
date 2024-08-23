const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  USERNAME:process.env.USERNAME,
  PASSWORD:process.env.PASSWORD,
  DATABASE:process.env.DATABASE
};
