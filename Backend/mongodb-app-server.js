const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/karibu-groceries";
mongoose.connect(URI)
  .then(() => {
    console.log("kgl db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  })

let procorumentSchema = new mongoose.Schema({
  produceName: String,
  produceType: String,
  date: Date,
  time: String,
  tonnage: Number,
  cost: Number,
  sellingPrice: Number,
  dealerName: String,
  contact: String,
  branch: String
});

let procurementModel = mongoose.model("procurement", procorumentSchema);

module.exports = {procurementModel};