const { Transaction } = require("../models/Transaction");
const { Account } = require("../models/Account");
const { updateAccountBalance } = require("./accountService");

const addTransaction = async (userId, data) => {
  const account = await Account.findOne({ _id: data.account, user: userId });
  if (!account) {
    throw new Error("Account not found");
  }

  const newTransaction = new Transaction({
    ...data,
    user: userId,
    account: account._id,
    accountName: account.name,
    date: data.date ? new Date(data.date) : new Date(),
  });

  await newTransaction.save();

  let amountToUpdate = 0;
  if (data.transactionType === "expense") {
    amountToUpdate = -data.amount;
  } else if (data.transactionType === "income") {
    amountToUpdate = data.amount;
  }

  if (amountToUpdate !== 0) {
    await updateAccountBalance(account._id, amountToUpdate);
  }

  return newTransaction;
};

const getUserTransactions = async (userId) => {
  const allTransactions = await Transaction.find({ user: userId }).sort({
    date: -1,
  });
  return allTransactions;
};

const updateTransaction = async (id, userId, newData) => {
  const txn = await Transaction.findOne({ _id: id, user: userId });
  if (!txn) {
    throw new Error("Transaction not found");
  }

  // Rollback old balance
  let rollbackAmount = 0;
  if (txn.transactionType === "expense") {
    rollbackAmount = txn.amount;
  } else if (txn.transactionType === "income") {
    rollbackAmount = -txn.amount;
  }
  await updateAccountBalance(txn.account, rollbackAmount);

  // Apply new balance
  let newAmount = 0;
  if (newData.transactionType === "expense") {
    newAmount = -newData.amount;
  } else if (newData.transactionType === "income") {
    newAmount = newData.amount;
  }
  await updateAccountBalance(txn.account, newAmount);

  txn.name = newData.name || txn.name;
  txn.transactionType = newData.transactionType || txn.transactionType;
  txn.paymentMethod = newData.paymentMethod || txn.paymentMethod;
  txn.amount = newData.amount || txn.amount;
  txn.category = newData.category || txn.category;
  txn.description = newData.description || txn.description;
  txn.date = newData.date ? new Date(newData.date) : txn.date;

  await txn.save();
  return txn;
};

const deleteTransaction = async (id, userId) => {
  const txn = await Transaction.findOne({ _id: id, user: userId });
  if (!txn) {
    throw new Error("Transaction not found");
  }

  // Rollback balance
  let rollbackAmount = 0;
  if (txn.transactionType === "expense") {
    rollbackAmount = txn.amount;
  } else if (txn.transactionType === "income") {
    rollbackAmount = -txn.amount;
  }
  await updateAccountBalance(txn.account, rollbackAmount);

  await txn.deleteOne();
};

const getMonthlyTransactions = async (userId) => {
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

  return { monthly: monthlyTransactions };
};

const getPast7Days = async (userId) => {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 6);

  const sevenDays = await Transaction.find({
    user: userId,
    date: { $gte: sevenDaysAgo, $lte: now },
  }).sort({ date: -1 });

  return { pastSevenDays: sevenDays };
};

module.exports = {
  addTransaction,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
  getMonthlyTransactions,
  getPast7Days,
};
