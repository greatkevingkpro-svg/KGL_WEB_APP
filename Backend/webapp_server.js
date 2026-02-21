const express = require("express");
const { Procurement } = require("./procurement.js");
const { procurementModel } = require("./mongodb-app-server.js");

const app = express();

app.use(express.json());

// get request to the kgl homepage
app.get("/", (req, res) => {
  res.send("Welcome to Karibu Groceries LTD")
})

/**
 * get request
 * this method is to retrieve all procuremnt records
 * from the database
 */
app.get("/procurement", async (req, res) => {
  try {
    let procuremnt = await procurementModel.find({});
    res.status(200).json(procuremnt);
  } catch (error) {
    res.status(400).json({ message: "there was an error when retreiving the data from the databese", error });
  }
})

// listening to the server
app.listen(3000, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("the server is running very well as expected");
  }
})