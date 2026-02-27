const mongoose = require("mongoose");

let salesSchema = new mongoose.Schema({
  produceName: {
    type: String,
    required: true,
    minlength: 2,
  },
  tonnage: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
    minlength: 5
  },
  buyerName: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[a-zA-Z0-9 ]+$/, // allows letters, numbers, and spaces
    message: "Buyer name must be alphanumeric and at least 2 characters"
  },
  salesAgent: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[a-zA-Z0-9 ]+$/,
    message: "Sales agent name must be alphanumeric and at least 2 characters"
  },
  dateOfSale: {
    type: Date,
    required: true
  },
  timePurchaseMade: {
    type: String,
    required: true
  }

});

let salesModel = mongoose.model("sales", salesSchema);

module.exports = {salesModel};