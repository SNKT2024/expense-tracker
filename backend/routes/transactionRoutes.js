const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  addTransaction,
  getUserAllTransaction,
  updateTransaction,
  deleteTransaction,

  getTransactions,
} = require("../controllers/transactionControllers");
const router = express.Router();

// add transaction
router.post("/add-transaction", verifyToken, addTransaction);

// get user all transaction
router.get("/get-transactions", verifyToken, getUserAllTransaction);

// update
router.put("/:id", verifyToken, updateTransaction);
// delete
router.delete("/:id", verifyToken, deleteTransaction);

// getAvg
router.get("/get-average", verifyToken, getTransactions);

module.exports = router;
