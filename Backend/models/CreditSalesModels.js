const mongoose = require("mongoose");

let creditSalesSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[a-zA-Z0-9 ]+$/, // allows letters, numbers, and spaces
    message: "Buyer name must be alphanumeric and at least 2 characters"
  },
  nationalId: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[a-zA-Z0-9 ]+$/,
    message: "Location must be alphanumeric and at least 2 characters"
  },
  contact: {
    type: String,
    required: true
  },
  amountDue: {
    type: Number,
    required: true,
    minlength: 5
  },
  salesAgent: {
    type: String,
    required: true,
    minlength: 2,
    match: /^[a-zA-Z0-9 ]+$/, // allows letters, numbers, and spaces
    message: "Agent name must be alphanumeric and at least 2 characters"
  },
  dueDate: {
    type: Date,
    required: true
  },
  produceName: {
    type: String,
    required: true,
    minlength: 2,
  },
  produceType: {
    type: String,
    required: true,
    minlength: 2,
  },
  tonnage: {
    type: Number,
    required: true,
  },
  dispatchDate: {
    type: Date,
    required: true
  }
})

let creditSalesModel = mongoose.model("credit-sales", creditSalesSchema);

module.exports = {creditSalesModel};