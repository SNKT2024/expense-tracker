const express = require("express");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const accountRoutes = require("./routes/accountRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Running" });
});

// User Routes
app.use("/api/user", userRoutes);

// Transaction Routes
app.use("/api/transaction", transactionRoutes);

// Account Routes
app.use("/api/account", accountRoutes);

dbConnection().then(() => {
  app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
});
