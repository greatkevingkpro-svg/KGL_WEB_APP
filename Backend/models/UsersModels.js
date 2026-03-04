const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["director", "manager", "sales agent"]
  },
  branch: {
    type: String,
    enum: ["Maganjo", "Matugga"],
    required: function () {
      console.log("ROLE VALUE:", this.role);
      return this.role.toLowerCase() !== "director";
    }
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"]
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };