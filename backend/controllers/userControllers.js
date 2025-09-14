const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ msg: "User already exists with this email." });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPass });
    await newUser.save();

    const { password: _, ...userData } = newUser.toObject();
    return res
      .status(201)
      .json({ msg: "User created successfully", data: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found. Please register." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    const { password: _, ...userData } = user.toObject();
    return res.status(200).json({
      msg: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { addUser, login };
