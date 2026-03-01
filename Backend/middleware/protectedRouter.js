const express = require("express");
const protectedRouter = express.Router();
const { authRolesForSales } = require("./salesAuth.js");
const { salesModel } = require("../models/SalesModels.js")

// sales/ get request protector
protectedRouter.get(
  "/sales",
  authRolesForSales("manager", "sales agent"),
  async (req, res) => {
    try {
      const sales = await salesModel.find();

      res.status(200).json({
        message: "Sales fetched successfully",
        data: sales
      });

    } catch {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  }
);

// sales/ post request protector
protectedRouter.post(
  "/sales",
  authRolesForSales("manager", "sales agent"),
  async (req, res) => {
    try {
      const newSale = await salesModel.create(req.body);
      res.status(201).json({
        message: "Sale created successfully",
        data: newSale
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = { protectedRouter };