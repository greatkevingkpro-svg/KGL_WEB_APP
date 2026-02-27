const mongoose = require("mongoose");

let procurementSchema = new mongoose.Schema({
  produceName: {
    type: String,
    required: true
  },
  produceType: {
    type: String,
    required: true
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
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },

  dealerName: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  }
});

const procurementModel = mongoose.model("Procurement", procurementSchema);

module.exports = { procurementModel };
