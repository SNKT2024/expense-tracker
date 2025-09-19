const express = require("express");
const { addUser, login } = require("../controllers/userController");
const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);

module.exports = router;
