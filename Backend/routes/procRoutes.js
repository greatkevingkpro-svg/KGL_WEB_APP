const express = require("express");
const { procurementModel } = require("../models/ProcModels.js");
const { KGLErrors } = require("../utils/customError.js");

// create routers for procurement
const router = express.Router();


/**
 * @swagger
 * /api/procurements:
 *   get:
 *     summary: Get all procurements
 *     description: Retrieve a list of all users in the system
 *     tags:
 *       - Procurements
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique ID of the procurement record
 *                   produceName:
 *                     type: string
 *                     description: The name of the produce
 *                   produceType:
 *                     type: string
 *                     description: The type of the produce
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The date of procurement
 *                   time:
 *                     type: string
 *                     description: The time of procurement
 *                   tonnage:
 *                     type: number
 *                     description: The tonnage of the produce procured
 *                   cost:
 *                     type: number
 *                     description: The cost of the procurement
 *                   sellingPrice:
 *                     type: number
 *                     description: The selling price of the produce
 *                   dealerName:
 *                     type: string
 *                     description: The name of the dealer from whom the produce was procured
 *                   contact:
 *                     type: string
 *                     description: The contact information of the dealer
 *                   branch:
 *                     type: string
 *                     description: The branch where the procurement took place
 *       404:
 *         description: No procurement data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that no procurement data was found
 *                 error:
 *                   type: string
 *                   description: HTTP status code indicating the error
 *                 reason:
 *                   type: string
 *                   description: Additional information about the error 
 */
router.get("/", async (req, res) => {
  try {
    let procurementData = await procurementModel.find({});
    res.status(200).json(procurementData);
  } catch (err) {
    next(new KGLErrors("There was an error fetching procurement data from the database", 500, err.message));
  }
})


/**
 * @swagger
 * /api/procurements/{id}:
 *   get:
 *     summary: Get procurement data by ID
 *     description: Retrieve procurement data from the database using a unique ID.
 *     tags:
 *       - Procurements
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the procurement data to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single procurement record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique ID of the procurement record
 *                 produceName:
 *                   type: string
 *                   description: The name of the produce
 *                 produceType:
 *                   type: string
 *                   description: The type of the produce
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: The date of procurement
 *                 time:
 *                   type: string
 *                   description: The time of procurement
 *                 tonnage:
 *                   type: number
 *                   description: The tonnage of the produce procured
 *                 cost:
 *                   type: number
 *                   description: The cost of the procurement
 *                 sellingPrice:
 *                   type: number
 *                   description: The selling price of the produce
 *                 dealerName:
 *                   type: string
 *                   description: The name of the dealer from whom the produce was procured
 *                 contact:
 *                   type: string
 *                   description: The contact information of the dealer
 *                 branch:
 *                   type: string
 *                   description: The branch where the procurement took place
 *       400:
 *         description: Invalid ID format
 */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  if(id.length < 5) {
    next(new KGLErrors("Invalid ID format", 400, "ID must be at least 5 characters long"));
  }

  try {
    let procurementData = await procurementModel.findById({_id: id});

    if(!procurementData) {
      next(new KGLErrors("Procurement data not found", 404, `No procurement data found with ID: ${id}`));
    } else {
      res.status(200).json(procurementData);
    }
  } catch (err) {
    next(new KGLErrors("There was an error fetching procurement data by ID", 404, err.message));
  }
});


/**
 * @swagger
 * /api/procurements
 *   post:
 *     summary: Create new procurement records
 *     description: Creates a new procurement record in the database with the provided information.
 *     tags:
 *       - Procurements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The unique ID of the procurement record
 *               produceName:
 *                 type: string
 *                 description: The name of the produce
 *               produceType:
 *                 type: string
 *                 description: The type of the produce
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of procurement
 *               time:
 *                 type: string
 *                 description: The time of procurement
 *               tonnage:
 *                 type: number
 *                 description: The tonnage of the produce procured
 *               cost:
 *                 type: number
 *                 description: The cost of the procurement
 *               sellingPrice:
 *                 type: number
 *                 description: The selling price of the produce
 *               dealerName:
 *                 type: string
 *                 description: The name of the dealer from whom the produce was procured
 *               contact:
 *                 type: string
 *                 description: The contact information of the dealer
 *               branch:
 *                 type: string
 *                 description: The branch where the procurement took place
 */
router.post("/", async (req, res) => {
  const body = req.body;

  try {
    // Create new document
    const procurement = new procurementModel(body);

    // Save to DB
    procurement.save()
      .then(() => { 
        res.status(201).json({ message: "Procurement saved successfully to the database", data: body });
      })
      .catch((error) => {
        next(new KGLErrors("There was an error saving procurement data to the database", 400, error.message));
      });

  } catch (error) {
    next(new KGLErrors("There was an error processing your request", 400, error.message));
  }
});


module.exports = {router};