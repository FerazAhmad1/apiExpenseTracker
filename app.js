const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const Expense = require("./models/expense");
const userRouter = require("./routes/userRouter");
const sequelize = require("./utils/database");
const expenseRouter = require("./routes/expenseRouter");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/expense", expenseRouter);
Expense.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Expense);
(async () => {
  const response = await sequelize.sync();
})();

console.log(process.env.PASSWORD);

module.exports = app;
