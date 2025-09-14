const express = require("express");
const {
  addAccount,
  userAccounts,
} = require("../controllers/accountTransaction");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Add Account
router.post("/add-account", verifyToken, addAccount);
// get user accounts
router.get("/user-accounts", verifyToken, userAccounts);

module.exports = router;
