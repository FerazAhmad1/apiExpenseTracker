const express = require("express");
const { User } = require("./models/user");
const userRouter = require("./routes/userRouter");
const sequelize = require("./utils/database");
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRouter);
(async () => {
  const response = await sequelize.sync();
})();

console.log(process.env.PASSWORD);

module.exports = app;
