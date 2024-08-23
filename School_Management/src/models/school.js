"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    static associate(models) {
      // define association here
    }
  }
  School.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 7), // Decimal with precision
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 7), // Decimal with precision
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "School",
    }
  );
  return School;
};
