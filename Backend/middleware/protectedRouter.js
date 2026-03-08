const express = require("express");
const protectedRouter = express.Router();
const { authorizeRoles } = require("./authorizeRoles.js");
const { salesModel } = require("../models/SalesModels.js")
const { creditSalesModel } = require("../models/CreditSalesModels.js")
const { procurementModel } = require("../models/ProcModels.js")
const { userModel } = require("../models/UsersModels.js")

// sales/ get request protector
protectedRouter.get(
  "/sales",
  authorizeRoles("manager", "sales agent"),
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
  authorizeRoles("manager", "sales agent"),
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


protectedRouter.get(
  "/credit-sales",
  authorizeRoles("manager", "sales agent"),
  async (req, res) => {
    try {
      const newCreditSale = await creditSalesModel.create(req.body);
      res.status(201).json({
        message: "credit Sale fetched successfully",
        data: newCreditSale
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);


protectedRouter.post(
  "/credit-sales",
  authorizeRoles("manager", "sales agent"),
  async (req, res) => {
    try {
      const newCreditSale = await creditSalesModel.create(req.body);
      res.status(201).json({
        message: "credit Sale created successfully",
        data: newCreditSale
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);


// porcurement/ post request protector
protectedRouter.post(
  "/porcurements",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const newPorcurements = await procurementModel.find();

      res.status(200).json({
        message: "porcurements created successfully",
        data: newPorcurements
      });

    } catch {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  }
);



protectedRouter.get(
  "/users",
  authorizeRoles("manager", "director"),
  async (req, res) => {
    try {
      const users = await userModel.find();

      res.status(200).json({
        message: "users fetched successfully",
        data: users
      });

    } catch {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  }
);


protectedRouter.post(
  "/users",
  authorizeRoles("manager", "director"),
  async (req, res) => {
    try {
      const newUser = await userModel.create(req.body);
      res.status(201).json({
        message: "user created successfully",
        data: newUser
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = { protectedRouter };