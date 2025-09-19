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
app.use("/api/users", userRoutes);

// Transaction Routes
app.use("/api/transactions", transactionRoutes);

// Account Routes
app.use("/api/accounts", accountRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

dbConnection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
});
