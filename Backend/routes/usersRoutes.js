const express = require("express");
const { userModel } = require("../models/UsersModels.js");
const { KGLErrors } = require("../utils/customError.js");


// create users routers
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 password:
 *                   type: string
 *                 branch:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: No user found
 */
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


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user from the database based on the provided ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 branch:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: User not found
 */
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


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the database with the provided information.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The unique identifier for the user (optional, will be generated if not provided)
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               userName:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 description: The role of the user (director, manager, sales agent)
 *               branch:
 *                 type: string
 *                 description: The branch of the user (Maganjo, Matuga) - required if role is not director
 *               status:
 *                 type: string
 *                 description: The status of the user (active, inactive)
 */
router.post("/", async (req, res, next) => {
  try {
    let body = req.body;

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


/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Updates a user's information in the database based on the provided ID and request body.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               branch:
 *                 type: string
 *               status:
 *                 type: string
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user from the database based on the provided ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Failed to delete user
 *       404:
 *         description: User not found
 */
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
    console.log(error);
    res.status(400).json({
      error: "Failed to delete user",
      details: error.message
    });
  }
});


module.exports = { router };