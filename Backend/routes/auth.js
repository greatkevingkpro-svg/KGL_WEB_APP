const express = require("express")
const router = express.Router()
const { userModel } = require("../models/UsersModels.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
  try {
    // get user name and password
    const { userName, password } = req.body;

    // check if the user exist in the database
    let _user = await userModel.findOne({ userName })
    if (!_user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let isPasswordCorrect = await bcrypt.compare(password, _user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // buildind jwt payload
    let user = {
      name: _user.name,
      userName: _user.userName,
      role: _user.role,
      branch: _user.branch,
      sub: _user.id
    }

    let token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

    res.status(200).json({ message: "Login Successful", token });

  } catch (error) {
    console.log("login error:", error);
    res.status(500).json({ message: "Server error" })
  }

})

module.exports = router;