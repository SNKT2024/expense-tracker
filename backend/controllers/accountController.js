const accountService = require("../services/accountService");

const addAccount = async (req, res, next) => {
  try {
    const { name, type, balance } = req.body;
    const userId = req.userId;
    const account = await accountService.addAccount(
      userId,
      name,
      type,
      balance
    );
    res
      .status(201)
      .json({ msg: "Account created successfully", data: account });
  } catch (error) {
    next(error);
  }
};

const userAccounts = async (req, res, next) => {
  try {
    const userId = req.userId;
    const accounts = await accountService.getUserAccounts(userId);
    res.status(200).json({ msg: "User accounts", data: accounts });
  } catch (error) {
    next(error);
  }
};

module.exports = { addAccount, userAccounts };
