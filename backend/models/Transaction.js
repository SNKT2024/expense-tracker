const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  transactionType: {
    type: String,
    enum: ["expense", "income", "transfer"],
    required: true,
  },
  paymentMethod: { type: String, enum: ["cash", "upi"], required: true },
  amount: { type: Number, required: true },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  accountName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = { Transaction };
