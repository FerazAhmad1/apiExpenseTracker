const express = require("express");
const {
  fetchExpenses,
  createExpense,
} = require("../controllers/expenseController");
const router = express.Router();

router.route("/").get(fetchExpenses).post(createExpense);

module.exports = router;
