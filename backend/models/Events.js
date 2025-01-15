const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Event", Schema);