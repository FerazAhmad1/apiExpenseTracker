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
  const t = await sequelize.transaction();
  try {
    const prvTotalAmount = req.user.dataValues.totalamount;
    const id = req.user.dataValues.id;
    const { amount, description, category } = req.body;
    const totalamount = amount * 1 + prvTotalAmount;
    console.log(totalamount);

    const expense = await req.user.createExpense(
      {
        amount,
        description,
        category,
      },
      { transaction: t }
    );
    console.log(expense);
    req.user.totalamount = totalamount;
    await req.user.save({ transaction: t });
    t.commit();
    res.status(200).json({ status: "success", data: expense.dataValues });
  } catch (error) {
    console.log(error);
    t.rollback();
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
  const response = await Expense.destroy({
    where: {
      id,
      userId: req.user.id,
    },
  });
  res.status(200).json({
    status: "success",
  });
  return;
};

exports.fetchallExpense = async (req, res, next) => {
  const leaderBoardsData = await User.findAll({
    attributes: ["id", "name", "totalamount"],
  });

  res.status(200).json({
    status: "success",
    data: leaderBoardsData,
  });
};
