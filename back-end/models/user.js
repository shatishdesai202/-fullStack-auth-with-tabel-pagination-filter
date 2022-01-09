const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 1,
    max: 30,
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 1022,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userSchema);
