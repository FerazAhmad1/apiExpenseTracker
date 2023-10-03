const { User } = require("../models/user");
exports.fetchAlluser = async (req, res, next) => {
  const allUsers = await User.findAll();
  console.log(allUsers);
};
exports.createUser = async (req, res, next) => {
  console.log("yes");
};
