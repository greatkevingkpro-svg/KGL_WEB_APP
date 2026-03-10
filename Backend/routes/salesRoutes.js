const express = require("express");
const { salesModel } = require("../models/SalesModels.js");
const { stockModel } = require("../models/stockModel.js")
const { KGLErrors } = require("../utils/customError.js");

// create routers for sales
const router = express.Router();


/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Retrieve a list of sales records
 *     description: Retrieve a list of all sales records from the database.
 *   tags:
 *      - Sales
 *   responses:
 *     200:
 *       description: A list of sales records
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 produceName:
 *                   type: string
 *                 tonnage:
 *                   type: number
 *                 amountPaid:
 *                   type: number
 *                 buyerName:
 *                   type: string
 *                 salesAgent:
 *                   type: string
 *                 dateOfSale:
 *                   type: string
 *                 timePurchaseMade:
 *                   type: string
 *     404:
 *       description: An error occurred while fetching sales records
 */
router.get("/", async (req, res) => {
  try {
    let sales = await salesModel.find({});
    res.status(200).json(sales);
  } catch (err) {
    next(new KGLErrors("An error occurred while fetching sales records", 404, err.message));
  }
});


/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Retrieve a single sales record by ID
 *     description: Retrieve a single sales record from the database using its unique ID.
 *     tags:
 *       - Sales
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the sales record to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single sales record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 produceName:
 *                   type: string
 *                 tonnage:
 *                   type: string
 *                 amountPaid:
 *                   type: number
 *                 buyerName:
 *                   type: string
 *                 salesAgent:
 *                   type: string
 *                 dateOfSale:
 *                   type: string
 *                 timePurchaseMade:
 *                   type: string
 */
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;

  if (id.length < 5) {
    next(new KGLErrors("invvalid id signature", 400));
  }

  try {
    let sales = await salesModel.find({ _id: id });
    if (!sales) {
      res.status(404).json({ message: "sale not found" });
    }
    res.status(200).json(sales);
  } catch (error) {
    next(new KGLErrors("failed to find sale", 404, error.message));
  }
})


/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sales record
 *     description: Create a new sales record in the database.
 *     tags:
 *       - Sales
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
 *               produceName:
 *                 type: string
 *                 description: The name of the produce sold
 *               tonnage:
 *                 type: number
 *                 description: The tonnage of the produce sold
 *               amountPaid:
 *                 type: number
 *                 description: The amount paid for the sale
 *               buyerName:
 *                 type: string
 *                 description: The name of the buyer
 *               salesAgent:
 *                 type: string
 *                 description: The name of the sales agent
 *               dateOfSale:
 *                 type: string
 *                 description: The date of the sale (in ISO format)
 *               timePurchaseMade:
 *                 type: string
 *                 description: The time the purchase was made (in HH:mm format)
 */
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { produceName, branch, tonnage } = body;
    const amountToSubtract = Number(tonnage);

    // Availability Check: Ensure store has enough produce
    const stock = await stockModel.findOne({
      produceName: { $regex: new RegExp(`^${produceName.trim()}$`, 'i') },
      branch: branch.trim()
    });

    if (!stock || stock.tonnage < tonnage) {
      return res.status(400).json({
        message: `Insufficient stock at ${branch}. Available: ${stock ? stock.tonnage : 0}kg.`
      });
    }

    // Record Sale using salesModel
    const sales = new salesModel(body);
    const savedSales = await sales.save()

    // Decrease Stock Tonnage physically
    const updatedStock = await stockModel.findOneAndUpdate(
      { produceName: produceName.trim(), branch: branch.trim() },
      { $inc: { tonnage: -amountToSubtract } },
      { returnDocument: 'after' }
    );

    if (!updatedStock) {
      console.error("FAILED TO UPDATE STOCK: No matching record found.");
      return res.status(500).json({ message: "Database error: Could not find stock to decrement." });
    }

    res.status(201).json({ message: "Sale successful", remainingStock: updatedStock.tonnage });

  } catch (error) {
    console.error("Error saving sales:", error);
    res.status(500).json({ message: "There was an error saving sales data", error: error.message });
  }
})


module.exports = { router };