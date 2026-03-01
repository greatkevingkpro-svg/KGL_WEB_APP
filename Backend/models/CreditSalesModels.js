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
    required: [true, "National ID (NIN) is required"],
    uppercase: true,
    trim: true,
    match: [
      /^(CM|CF)[0-9]{12}$/,
      "Enter a valid Ugandan NIN (e.g., CM123456789012)"
    ]
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
    required: [true, "Contact is required"],
    trim: true,
    match: [
      /^(?:\+256|256|0)7[0-9]{8}$/,
      "Enter a valid Ugandan phone number (e.g., +256701234567)"
    ]
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

module.exports = { creditSalesModel };