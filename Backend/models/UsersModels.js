// const { required, func } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ["director", "manager", "sales agent"]
  },
  branch: {
    type: String,
    enum: ["Maganjo", "Matuga"],
    required: function () {
      console.log("ROLE VALUE:", this.role);
      return this.role !== "director";
    }
  },
  currentBranch: {
    type: String,
    enum: ["Maganjo", "Matuga"],
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"]
  }
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };