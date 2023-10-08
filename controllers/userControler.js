const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  console.log(token);
  return token;
};
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
    console.log(error);
    // res.status(400).json({
    //   status: "Fail",
    //   message: "Duplicate Entry",
    // });
    return;
  }
};

exports.loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "user not found",
      });
      return;
    }
    const correctPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    console.log(correctPassword);
    if (correctPassword) {
      const token = signInToken(user.dataValues.id, user.dataValues.email);
      const cookieOption = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      if (process.env.Node_env === "production") cookieOption.secure = true;
      res.cookie("jwt", token, cookieOption);

      res.status(200).json({
        status: "success",
        token,
      });
      return;
    }
    res.status(403).json({
      status: "fail",
      token: "",
    });
  } catch (error) {
    throw error;
  }
};
