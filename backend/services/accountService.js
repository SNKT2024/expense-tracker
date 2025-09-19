const { Account } = require("../models/Account");
const { User } = require("../models/User");

const addAccount = async (userId, name, type, balance) => {
  const findAccount = await Account.findOne({ name, user: userId });
  if (findAccount) {
    throw new Error("Account with this name already exists");
  }

  const newAccount = new Account({
    user: userId,
    name,
    type,
    balance,
  });

  await newAccount.save();
  await User.findByIdAndUpdate(userId, { $push: { accounts: newAccount._id } });

  return newAccount;
};

const getUserAccounts = async (userId) => {
  const userAccounts = await Account.find({ user: userId });
  return userAccounts;
};

const updateAccountBalance = async (accountId, amountChange) => {
  const updatedAccount = await Account.findByIdAndUpdate(accountId, {
    $inc: { balance: amountChange },
  });

  if (!updatedAccount) {
    throw new Error("Account not found");
  }
};

module.exports = { addAccount, getUserAccounts, updateAccountBalance };
