const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
exports.User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
