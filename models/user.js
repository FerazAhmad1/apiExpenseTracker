const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const bcrypt = require("bcrypt");
const User = sequelize.define("user", {
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
  changePasswordAt: {
    type: DataTypes.DATEONLY,
  },
});

User.addHook("beforeSave", "hashpassword", async function (user, option) {
  if (user.changed("password")) {
    const hashed = await bcrypt.hash(user.password, 12);
    user.password = hashed;
  }
  return;
});

User.addHook("afterCreate", "excludepasswordfromresponse", (user, option) => {
  user.password = undefined;
});
module.exports = User;
