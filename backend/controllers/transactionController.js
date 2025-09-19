const transactionService = require("../services/transactionService");

const addTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.addTransaction(
      req.userId,
      req.body
    );
    res
      .status(201)
      .json({ msg: "Transaction added successfully", data: transaction });
  } catch (error) {
    next(error);
  }
};

const getUserAllTransaction = async (req, res, next) => {
  try {
    const transactions = await transactionService.getUserTransactions(
      req.userId
    );
    res.status(200).json({ msg: "All user transactions", data: transactions });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.userId,
      req.body
    );
    res
      .status(200)
      .json({ msg: "Transaction updated successfully", data: transaction });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    await transactionService.deleteTransaction(req.params.id, req.userId);
    res.status(200).json({ msg: "Transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.getMonthlyTransactions(
      req.userId
    );
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

const getSevenDays = async (req, res, next) => {
  try {
    const transactions = await transactionService.getPast7Days(req.userId);
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTransaction,
  getUserAllTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getSevenDays,
};
