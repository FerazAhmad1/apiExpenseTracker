const express = require("express");
const {
  fetchAlluser,
  createUser,
  loginHandler,
} = require("../controllers/userControler");
const router = express.Router();

router.post("/login", loginHandler);
router.route("/").get(fetchAlluser).post(createUser);
module.exports = router;
