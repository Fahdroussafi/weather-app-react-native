const express = require("express");
const router = express();
const {
  CreateUser,
  LoginUser,
} = require("../controllers/authController");

router.post("/create-user", CreateUser);
router.post("/login", LoginUser);

module.exports = router;
