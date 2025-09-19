const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["cash", "bank"],
    required: true,
  },
  balance: { type: Number, default: 0 },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = { Account };
