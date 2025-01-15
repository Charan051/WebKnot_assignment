const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  attendee: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});

module.exports = mongoose.model("Task", Schema);