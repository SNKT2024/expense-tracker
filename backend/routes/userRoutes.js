const express = require("express");
const { addUser, login } = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);

module.exports = router;
