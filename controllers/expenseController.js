const { where, Sequelize } = require("sequelize");
const Expense = require("../models/expense");
const sequelize = require("../utils/database");
const User = require("../models/user");
exports.fetchExpenses = async (req, res, next) => {
  try {
    const expenses = await req.user.getExpenses();
    res.status(200).json({
      status: "success",
      data: expenses,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
exports.createExpense = async (req, res, next) => {
  try {
    console.log(req.user);
    const { amount, description, category } = req.body;
    const expense = await req.user.createExpense({
      amount,
      description,
      category,
    });
    const data = expense.dataValues;
    res.status(200).json({
      status: "success",
      data,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  const id = req.params.id;
  const { amount, category, description } = req.body;
  const response = await Expense.update(
    { amount, category, description },
    { where: { id, userId: req.user.id } }
  );
  res.status(200).json({
    response,
  });
  console.log(response);
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const response = await req.user.destroy({
    where: { id, userId: req.user.id },
  });
  res.status(200).json({
    status: "success",
  });
  return;
};

exports.fetchallExpense = async (req, res, next) => {
  const leaderBoardsData = await User.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.fn("SUM", sequelize.col("expenses.amount")), "TotalAmount"],
    ],
    include: {
      model: Expense,
      required: true,
      attributes: [],
    },
    group: ["User.id"],
    order: [[sequelize.literal("TotalAmount"), "DESC"]],
  });
  console.log(leaderBoardsData);
  res.status(200).json({
    data: leaderBoardsData,
  });
};
