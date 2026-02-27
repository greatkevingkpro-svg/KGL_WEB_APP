const express = require("express");
const {salesModel} = require("../models/SalesModels.js");
const {KGLErrors} = require("../utils/customError.js");

// create routers for sales
const router = express.Router();


// get all sales
router.get("/", async (req, res) => {
  try {
    let sales = await salesModel.find({});
    res.status(200).json(sales);
  } catch (err) {
    next(new KGLErrors("An error occurred while fetching sales records", 404, err.message));
  }
});


// get a sales record by it unique id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;

  if(id.length < 5) {
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


// create a new sale record
router.post("/", async (req, res, next) => {
  let body = req.body;

  try {
    let sales = new salesModel(body);

    sales.save()
      .then(() => {
        res.status(201).json({message: "Sales record created successfully", sales})
      })
      .catch((err) => {
        throw new KGLErrors("Failed to create sales record", 400, err.message);
      });
  } catch (err) {
    next(new KGLErrors("An error occurred while processing the request", 500, err.message));
  }
})


module.exports = {router};