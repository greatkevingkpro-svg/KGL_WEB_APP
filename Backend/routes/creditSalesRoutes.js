const express = require("express");
const { creditSalesModel } = require("../models/CreditSalesModels.js");
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
router.get("/", async (req, res) => {
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
  let id = req.params.id;

  if (id.length < 5) {
    next(new KGLErrors("invvalid id signature", 400));
  }

  try {
    let creditSales = await creditSalesModel.find({_id: id});
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
  let body = req.body;

  try {
    let creditSales = new creditSalesModel(body);

    const savedcreditSales = await creditSales.save()
      
    res.status(201).json({message: "credit Sale record created successfully", data: savedcreditSales})

  } catch (err) {
    next(new KGLErrors("An error occurred while processing the request", 500, err.message));
  }
})

module.exports = {router}