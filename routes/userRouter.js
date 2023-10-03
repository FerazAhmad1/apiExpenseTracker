const express = require("express");
const { fetchAlluser, createUser } = require("../controllers/userControler");
const router = express.Router();

router.route("/").get(fetchAlluser).post(createUser);
module.exports = router;
