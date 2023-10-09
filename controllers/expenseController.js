const Expense = require("../models/expense");

exports.fetchExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
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
    const { amount, description, category } = req.body;
    const expense = await Expense.create({ amount, description, category });
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
