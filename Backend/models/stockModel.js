const mongoose = require("mongoose");

/**
 * STOCK SCHEMA (The Store)
 * This schema acts as my centralized inventory tracker.
 * It stores the total weight (tonnage) and the CURRENT price per kg.
 */
const stockSchema = new mongoose.Schema({
  produceName: { type: String, required: true },
  branch: { 
    type: String, 
    required: true, 
    enum: ["Maganjo", "Matugga"] 
  },
  tonnage: { type: Number, default: 0 }, // Representing weight in kg
  sellingPrice: { type: Number, default: 0 } // Price per 1kg
}, { timestamps: true });

// Ensure unique produce per branch to prevent duplicate rows
stockSchema.index({ produceName: 1, branch: 1 }, { unique: true });

const stockModel = mongoose.model("stocks", stockSchema);

module.exports = {stockModel};