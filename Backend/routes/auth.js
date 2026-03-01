const express = require("express")
const router = express.Router()
const { userModel } = require("../models/UsersModels.js")
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  // get user email and password
  const { email, password } = req.body;

  // check if the user exist in the database
  let _user = await userModel.findOne({ email, password })

  if (_user) {
    let user = {
      userName: _user.userName,
      role: _user.role,
      sub: _user.id
    }

    let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

    res.status(200).json({ message: "Login Successful", token });
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }
})

module.exports = { router };