const express = require("express");
const {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  fetchallExpense,
} = require("../controllers/expenseController");
const { protector } = require("../controllers/userControler");
const router = express.Router();

router.get("/leaderbord", fetchallExpense);
router.route("/").get(protector, fetchExpenses).post(protector, createExpense);
router
  .route("/:id")
  .patch(protector, updateExpense)
  .delete(protector, deleteExpense);

module.exports = router;
