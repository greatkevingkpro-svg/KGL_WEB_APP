const express = require("express");
const { creditSalesModel } = require("../models/CreditSalesModels.js");
const { KGLErrors } = require("../utils/customError.js");

// create routers for credit sales
const router = express.Router();

// get all credit sales
router.get("/", async (req, res) => {
  try {
    let creditSales = await creditSalesModel.find({});
    res.status(200).json(creditSales)
  } catch (err) {
    next(new KGLErrors("An error occurred while fetching credit sales records", 404, err.message));
  }
})

// get credit sale by id
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

// post request for creating a credit sale record and save it in the DB
router.post("/", async (req, res, next) => {
  let body = req.body;

  try {
    let creditSales = new creditSalesModel(body);

    creditSales.save()
      .then(() => {
        res.status(201).json({message: "credit Sale record created successfully", creditSales})
      })
      .catch((err) => {
        throw new KGLErrors("Failed to create credit Sale record", 400, err.message);
      });
  } catch (err) {
    next(new KGLErrors("An error occurred while processing the request", 500, err.message));
  }
})

module.exports = {router}