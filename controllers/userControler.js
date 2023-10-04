const { User } = require("../models/user");
const bcrypt = require("bcrypt");
exports.fetchAlluser = async (req, res, next) => {
  const allUsers = await User.findAll();
  console.log(allUsers);
};
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });
  } catch (error) {
    console.log(error);
  }
};
