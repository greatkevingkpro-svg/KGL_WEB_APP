const express = require("express");
const { procurementModel } = require("../models/ProcModels.js");
const { KGLErrors } = require("../utils/customError.js");

// create routers for procurement
const router = express.Router();


// get all procurement
router.get("/", async (req, res) => {
  try {
    let procurementData = await procurementModel.find({});
    res.status(200).json(procurementData);
  } catch (err) {
    next(new KGLErrors("There was an error fetching procurement data from the database", 500, err.message));
  }
})


// get procurement record by it unique id
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


// post request for creating a new procurement record
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