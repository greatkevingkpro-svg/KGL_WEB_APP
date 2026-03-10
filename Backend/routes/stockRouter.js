const express = require("express");
const { stockModel } = require("../models/stockModel.js");

const router = express.Router();


/**
 * GET ALL STOCK: View everything in the warehouse
 */
router.get("/", async (req, res) => {
    try {
        const stocks = await stockModel.find();
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * GET SPECIFIC STOCK: Useful for auto-filling prices in sales forms
 * Example: GET /api/stock/Maganjo/Maize
 */
router.get("/:branch/:produceName", async (req, res) => {
  try {
    const { branch, produceName } = req.params;
    const stock = await stockModel.findOne({ branch, produceName });
    if (!stock) {
      return res.status(404).json({ message: "Produce not found in this branch" });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router };