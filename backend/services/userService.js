const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const addUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashPass });
  await newUser.save();

  const { password: _, ...userData } = newUser.toObject();
  return userData;
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found. Please register.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials.");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  const { password: _, ...userData } = user.toObject();
  return { user: userData, token };
};

module.exports = { addUser, login };
