const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.fetchAlluser = async (req, res, next) => {
  const allUsers = await User.findAll();
  console.log(allUsers);
};
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    const data = user.dataValues;
    res.status(201).json({
      status: "success",
      data,
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Duplicate Entry",
    });
    return;
  }
};
