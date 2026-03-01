const express = require("express");
const { userModel } = require("../models/UsersModels.js");
const { KGLErrors } = require("../utils/customError.js");
const { get } = require("mongoose");

// create users routers
const router = express.Router();

// get all existing users records
router.get("/", async (req, res) => {
  const users = await userModel.find({});
  try {
    console.log(users);
    if (users) {
      res.status(200).json({ message: "Users retrieved successfully", data: users });
    } else {
      throw new KGLErrors("No users found", 404);
    }
  } catch (error) {
    next(error);
  }
})


// get a user by his/her unique id
router.get("/:id", async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  try {
    if (user) {
      res.status(200).json(user);
    } else {
      throw new KGLErrors("User not found", 404);
    }
  } catch (error) {
    next(error);
  }
})


// create a new user
router.post("/", async (req, res, next) => {
  try {
    let body = req.body;

    body.password = "123456"

    let user = new userModel(body);

    user.save()
      .then((data) => {
        res.status(200).json({ message: "User created successfully", data })
      })
      .catch((err) => {
        res.status(400).json({ message: err.message, errors: err.errors });
      })

  } catch (error) {
    next(error);
  }
})


// update a user by using his/her unique id
router.patch("/:id", async (req, res, next) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});


// delete a user by using his/her unique id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to delete user",
      details: error.message
    });
  }
});


module.exports = { router };