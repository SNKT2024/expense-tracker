const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  addTransaction,
  getUserAllTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getSevenDays,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/", verifyToken, addTransaction);
router.get("/", verifyToken, getUserAllTransaction);
router.put("/:id", verifyToken, updateTransaction);
router.delete("/:id", verifyToken, deleteTransaction);
router.get("/monthly", verifyToken, getTransactions);
router.get("/weekly", verifyToken, getSevenDays);

module.exports = router;
