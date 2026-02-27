require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.KGL_DB_URI
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = {connectToMongoDB};