const express = require("express");
const {
  addAccount,
  userAccounts,
} = require("../controllers/accountController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, addAccount);
router.get("/", verifyToken, userAccounts);

module.exports = router;
