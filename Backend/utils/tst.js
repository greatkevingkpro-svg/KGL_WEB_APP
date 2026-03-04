const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { userModel } = require("../models/UsersModels");
require("dotenv").config();

const URI = process.env.KGL_DB_URI;

const testLogin = async () => {
  await mongoose.connect(URI);

  const user = await userModel.findOne({ userName: "directorofall@email.com" });
  console.log("User in DB:", user);

  const match = await bcrypt.compare("123456", user.password);
  console.log("Password match:", match);

  await mongoose.connection.close();
};

testLogin();