const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const bcrypt = require("bcrypt");
const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
