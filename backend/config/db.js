const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    if (!db) {
      throw new Error("Database connection failed");
    }
    console.log("DB connected successfully");
    return db;
  } catch (error) {
    console.error("Inter Server Error", { msg: error });
  }
};

module.exports = dbConnection;
