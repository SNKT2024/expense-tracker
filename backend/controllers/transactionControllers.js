const mongoose = require("mongoose");
const { Transaction } = require("../models/Transaction");
const { Account } = require("../models/Account");
const { updateAccount } = require("./accountTransaction");
const { Types } = require("mongoose");

//  Add New Transaction
const addTransaction = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.userId;

    // find account
    const account = await Account.findOne({
      _id: data.account,
      user: userId,
    });
    if (!account) {
      return res.status(404).json({ msg: "No Account Found with this user" });
    }

    const addData = new Transaction({
      ...data,
      user: userId,
      account: account._id,
      accountName: account.name,
      date:
        data.date && data.date.trim() !== "" ? new Date(data.date) : new Date(),
    });
    await addData.save();

    let amountToUpdate = 0;

    if (data.transactionType === "expense") {
      amountToUpdate = -data.amount;
    } else if (data.transactionType === "income") {
      amountToUpdate = data.amount;
    }

    if (amountToUpdate !== 0) {
      await updateAccount(account._id, amountToUpdate);
    }

    return res
      .status(200)
      .json({ msg: "Transaction added succesfully", status: true, addData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error: error });
  }
};

// Find All Transaction according to user
const getUserAllTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const allTransactions = await Transaction.find({ user: userId });

    return res
      .status(200)
      .json({ msg: "All Transactions of user", data: allTransactions });
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const newData = req.body;

    const txn = await Transaction.findOne({ _id: id, user: userId });
    if (!txn) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    // rollback old balance
    let rollbackAmount = 0;
    if (txn.transactionType === "expense") {
      rollbackAmount = txn.amount;
    } else if (txn.transactionType === "income") {
      rollbackAmount = -txn.amount;
    }
    await updateAccount(txn.account, rollbackAmount);

    // apply new balance
    let newAmount = 0;
    if (newData.transactionType === "expense") {
      newAmount = -newData.amount;
    } else if (newData.transactionType === "income") {
      newAmount = newData.amount;
    }
    await updateAccount(txn.account, newAmount);

    txn.name = newData.name || txn.name;
    txn.transactionType = newData.transactionType || txn.transactionType;
    txn.paymentMethod = newData.paymentMethod || txn.paymentMethod;
    txn.amount = newData.amount || txn.amount;
    txn.category = newData.category || txn.category;
    txn.description = newData.description || txn.description;
    txn.date =
      newData.date && newData.date.trim() !== ""
        ? new Date(newData.date)
        : txn.date;

    await txn.save();

    return res
      .status(200)
      .json({ msg: "Transaction updated successfully", data: txn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const txn = await Transaction.findOne({ _id: id, user: userId });
    if (!txn) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    // rollback balance
    let rollbackAmount = 0;
    if (txn.transactionType === "expense") {
      rollbackAmount = txn.amount;
    } else if (txn.transactionType === "income") {
      rollbackAmount = -txn.amount;
    }
    await updateAccount(txn.account, rollbackAmount);

    await txn.deleteOne();

    return res
      .status(200)
      .json({ msg: "Transaction deleted successfully", status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = new Types.ObjectId(req.userId);
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;

    const monthlyTransactions = await Transaction.find({
      user: userId,
      $expr: {
        $and: [
          { $eq: [{ $year: "$date" }, year] },
          { $eq: [{ $month: "$date" }, month] },
        ],
      },
    }).sort({ date: -1 });

    res.json({
      monthly: monthlyTransactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTransactions };

module.exports = {
  addTransaction,
  getUserAllTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
};
