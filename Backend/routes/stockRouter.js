const express = require("express");
const { stockModel } = require("../models/stockModel.js");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Stock Router hit: ${req.method} ${req.url}`);
  next();
});


/**
 * GET ALL STOCK: View everything in the database
 */
router.get("/", async (req, res) => {
  try {
    const stocks = await stockModel.find();

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

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
    // const { branch, produceName } = req.params;
    const branch = req.params.branch.trim();
    const produceName = req.params.produceName.trim().toLowerCase();
    
    const stock = await stockModel.findOne({
      branch: { $regex: new RegExp(`^${branch}$`, "i") },
      produceName: { $regex: new RegExp(`^${produceName}$`, "i") }
    });

    if (!stock) {
      return res.status(404).json({ message: "Produce not found in this branch" });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router };