const mongoose = require("mongoose");

let procurementSchema = new mongoose.Schema({
  produceName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9\s]+$/, "Name must be alpha-numeric"],
    trim: true
  },
  produceType: {
    type: String,
    required: true,
    minlength: [2, "Type must be at least 2 characters"],
    match: [/^[A-Za-z\s]+$/, "Type must contain alphabetic characters only"],
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  tonnage: {
    type: Number,
    required: true,
    min: [100, "Tonnage must be at least 100kg"]
  },
  cost: {
    type: Number,
    required: true,
    min: [10000, "Cost must be at least 5 digits (10000 UgX+)"]
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: [10000, "Selling price must be at least 5 digits"]
  },

  dealerName: {
    type: String,
    required: true,
    minlength: [2, "Dealer name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9\s]+$/, "Dealer name must be alpha-numeric"],
    trim: true
  },
  contact: {
    type: String,
    required: true,
    match: [
      /^(?:\+256|0)[0-9]{9}$/,
      "Enter a valid Ugandan phone number"
    ]
  },
  branch: {
    type: String,
    required: true,
    enum: {
      values: ["Maganjo", "Matugga"],
      message: "Branch must be either Maganjo or Matugga"
    }
  }
}, { timestamps: true });

const procurementModel = mongoose.model("Procurement", procurementSchema);

module.exports = { procurementModel };
