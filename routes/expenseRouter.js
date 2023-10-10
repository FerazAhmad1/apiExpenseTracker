const express = require("express");
const {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protector } = require("../controllers/userControler");
const router = express.Router();

router.route("/").get(protector, fetchExpenses).post(protector, createExpense);
router
  .route("/:id")
  .patch(protector, updateExpense)
  .delete(protector, deleteExpense);

module.exports = router;
