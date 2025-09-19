const userService = require("../services/userService");

const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.addUser(name, email, password);
    res.status(201).json({ msg: "User created successfully", data: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({ msg: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser, login };
