const express = require("express");
const mongoose = require("mongoose")
const { creditSalesModel } = require("../models/CreditSalesModels.js");
const { stockModel } = require("../models/stockModel.js")
const { KGLErrors } = require("../utils/customError.js");

// create routers for credit sales
const router = express.Router();

/**
 * @swagger
 * /api/credit-sales:
 *   get:
 *     summary: Get all credit sales
 *     description: Retrieve a list of all credit sales records.
 *     tags:
 *       - Credit Sales
 *     responses:
 *       200:
 *         description: A list of credit sales records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the credit sale record.
 *                   buyerName:
 *                     type: string
 *                     description: The name of the buyer for the credit sale record.
 *                   nationalId:
 *                     type: string
 *                     description: The unique identifier for the buyer.
 *                   location:
 *                     type: string
 *                     description: The location of the buyer for the credit sale record.
 *                   contact:
 *                     type: string
 *                     description: The contact information of the buyer for the credit sale record.
 *                   amountDue:
 *                     type: number
 *                     description: The amount due for the credit sale record.
 *                   salesAgent:
 *                     type: string
 *                     description: The name of the sales agent for the credit sale record.
 *                   dueDate:
 *                     type: date
 *                     description: The due date for the credit sale record.
 *                   produceName:
 *                     type: string
 *                     description: The name of the produce for the credit sale record.
 *                   produceType:
 *                     type: string
 *                     description: The type of the produce for the credit sale record.
 *                   tonnage:
 *                     type: number
 *                     description: The tonnage of the produce for the credit sale record.
 *                   dispatchDate:
 *                     type: date
 *                     description: The dispatch date for the credit sale record.
 */
router.get("/", async (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

  try {
    let creditSales = await creditSalesModel.find({});
    res.status(200).json(creditSales)
  } catch (err) {
    next(new KGLErrors("An error occurred while fetching credit sales records", 404, err.message));
  }
})

/**
 * @swagger
 * /api/credit-sales/{id}:
 *   get:
 *     summary: Get a specific credit sale by ID
 *     description: Retrieve a specific credit sale record by its unique identifier.
 *     tags:
 *       - Credit Sales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the credit sale record.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested credit sale record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the credit sale record.
 *                 buyerName:
 *                   type: string
 *                   description: The name of the buyer for the credit sale record.
 *                 nationalId:
 *                   type: string
 *                   description: The national ID of the buyer for the credit sale record.
 *                 location:
 *                   type: string
 *                   description: The location of the buyer for the credit sale record.
 *                 contact:
 *                   type: string
 *                   description: The contact information of the buyer for the credit sale record.
 *                 amountDue:
 *                   type: number
 *                   description: The amount due for the credit sale record.
 *                 salesAgent:
 *                   type: string
 *                   description: The name of the sales agent for the credit sale record.
 *                 dueDate:
 *                   type: date
 *                   description: The due date for the credit sale record.
 *                 produceName:
 *                   type: string
 *                   description: The name of the produce for the credit sale record.
 *                 produceType:
 *                   type: string
 *                   description: The type of the produce for the credit sale record.
 *                 tonnage:
 *                   type: number
 *                   description: The tonnage of the produce for the credit sale record.
 *                 dispatchDate:
 *                   type: date
 *                   description: The dispatch date for the credit sale record.
 */
router.get("/:id", async (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  let id = req.params.id;

  if (id.length < 5) {
    return next(new KGLErrors("invvalid id signature", 400));
  }

  try {
    let creditSales = await creditSalesModel.find({ _id: id });
    if (!creditSales) {
      res.status(404).json({ message: "credit sale not found" });
    }
    res.status(200).json(creditSales);

  } catch (error) {
    next(new KGLErrors("failed to find credit sale", 404, error.message));
  }
})

/**
 * @swagger
 * /api/credit-sales:
 *   post:
 *     summary: Create a new credit sales record
 *     description: Create a new sales record in the database.
 *     tags:
 *       - Credit Sales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The unique ID of the sales record (optional, will be generated if not provided)
 *               buyerName:
 *                 type: string
 *                 description: The name of the buyer for the credit sale record.
 *               nationalId:
 *                 type: string
 *                 description: The unique identifier for the buyer.
 *               location:
 *                 type: string
 *                 description: The location of the buyer for the credit sale record.
 *               contact:
 *                 type: string
 *                 description: The contact information of the buyer for the credit sale record.
 *               amountDue:
 *                 type: number
 *                 description: The amount due for the credit sale record.
 *               salesAgent:
 *                 type: string
 *                 description: The name of the sales agent for the credit sale record.
 *               dueDate:
 *                 type: date
 *                 description: The due date for the credit sale record.
 *               produceName:
 *                 type: string
 *                 description: The name of the produce for the credit sale record.
 *               produceType:
 *                 type: string
 *                 description: The type of the produce for the credit sale record.
 *               tonnage:
 *                 type: number
 *                 description: The tonnage of the produce for the credit sale record.
 *               dispatchDate:
 *                 type: date
 *                 description: The dispatch date for the credit sale record.
 */
router.post("/", async (req, res, next) => {
  const session = await mongoose.startSession();

  res.set('Cache-Control', 'no-store');

  try {
    session.startTransaction();

    const { produceName, branch, tonnage } = req.body;

    const cleanName = produceName.trim().toLowerCase();
    const cleanBranch = branch.trim();
    const amountToSubtract = Number(tonnage);

    // checks: if it's not a number, the update will fail
    if (isNaN(amountToSubtract)) {
      return res.status(400).json({ message: "Invalid tonnage value" });
    }

    // Check Store availability
    const stock = await stockModel.findOne(
      {
        produceName: { $regex: `^${cleanName}$`, $options: "i" },
        branch: { $regex: `^${cleanBranch}$`, $options: "i" }
      },
      null,
      { session }
    );

    if (!stock || stock.tonnage < amountToSubtract) {
      return res.status(400).json({
        message: `Insufficient stock for credit at ${branch}. Available: ${stock ? stock.tonnage : 0}kg.`
      });
    }

    // update stock after sale
    const updatedStock = await stockModel.findByIdAndUpdate(
      stock._id,
      { $inc: { tonnage: -amountToSubtract } },
      { new: true, session }
    );


    if (!updatedStock) {
      // If this logs, the names in Stock collection don't match Form
      console.error(`NOT FOUND: Looking for "${cleanName}" in "${cleanBranch}"`);
      return res.status(404).json({ message: "Stock record not found. Check name casing." });
    }

    // Record the Credit Sale
    let creditSales = new creditSalesModel(req.body);
    await creditSales.save({ session })

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Credit sale successful. Produce removed from store.", data: creditSales })

  } catch (error) {
    // rollback everything if ANY step fails
    await session.abortTransaction();
    session.endSession();

    console.error("Error saving credit sales:", error);
    res.status(500).json({ message: "There was an error saving credit sales data", error: error.message });
  }
})

module.exports = { router }