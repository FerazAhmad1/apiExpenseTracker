const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const Expense = require("./models/expense");
const userRouter = require("./routes/userRouter");
const sequelize = require("./utils/database");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
Expense.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Expense);
(async () => {
  const response = await sequelize.sync({ force: true });
})();

console.log(process.env.PASSWORD);

module.exports = app;
