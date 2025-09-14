const mongoose = require("mongoose");
const { Account } = require("../models/Account");
const { User } = require("../models/User");

//  Add Account
const addAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;

    // Find if account already exsist
    const findAccount = await Account.findOne({ name: data.name });
    if (findAccount) {
      return res.json({ msg: "Account with this name already exsist" });
    }
    const addData = new Account({
      ...data,
      user: userId,
    });
    await addData.save();
    await User.findByIdAndUpdate(userId, { $push: { accounts: addData._id } });

    return res
      .status(200)
      .json({ msg: "Account Created Successfully", data: addData });
  } catch (err) {
    console.log(err);
  }
};

// Update Account
const updateAccount = async (accountId, amountChange) => {
  try {
    const updateAccount = await Account.findByIdAndUpdate(accountId, {
      $inc: { balance: amountChange },
    });

    if (!updateAccount) {
      console.log("Account not found");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

// getUser Accounts
const userAccounts = async (req, res) => {
  try {
    const userId = req.userId;

    const userAccounts = await Account.find({ user: userId });

    return res.status(200).json({ msg: "User Accounts", data: userAccounts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { addAccount, updateAccount, userAccounts };
