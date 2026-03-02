require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {userModel} = require("./models/UsersModels")

const URI = process.env.KGL_DB_URI
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");

    const users = await userModel.find({});
    for (let user of users) {
      // only hash passwords that are not already hashed
      if (!user.password.startsWith("$2b$")) {
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        console.log(`Updated password for user: ${user.userName}`);
      }
    }

    console.log("Encrypted passwrod");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

module.exports = {connectToMongoDB};