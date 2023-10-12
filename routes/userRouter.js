const express = require("express");
const {
  fetchAlluser,
  createUser,
  loginHandler,
  forgotPassword,
  createorder,
} = require("../controllers/userControler");
const router = express.Router();

router.post("/login", loginHandler);
router.post("/forgotpassword", forgotPassword);
router.get("/create-order", createorder);
router.route("/").get(fetchAlluser).post(createUser);
module.exports = router;
