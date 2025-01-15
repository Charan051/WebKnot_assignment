// const express = require("express");
// const router = express.Router();
// const Attendee = require("../models/Attende");

// router.get("/", async (req, res) => {
//   const { eventId } = req.query;
//   const attendees = await Attendee.find({ eventId });
//   res.json(attendees);
// });

// router.post("/", async (req, res) => {
//   const attendee = new Attendee(req.body);
//   await attendee.save();
//   res.status(201).json(attendee);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Attendee = require("../models/Attende");

// Get attendees for a specific event
router.get("/", async (req, res) => {
  const { eventId } = req.query;
  try {
    const attendees = await Attendee.find({ eventId });
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ error: "Error fetching attendees" });
  }
});

// Create a new attendee
router.post("/", async (req, res) => {
  const attendee = new Attendee(req.body);
  try {
    await attendee.save();
    res.status(201).json(attendee);
  } catch (err) {
    res.status(500).json({ error: "Error saving attendee" });
  }
});

// Update an attendee's details (e.g., name)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedAttendee = await Attendee.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updatedAttendee);
  } catch (err) {
    res.status(500).json({ error: "Error updating attendee" });
  }
});

// Delete an attendee
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Attendee.findByIdAndDelete(id);
    res.json({ message: "Attendee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting attendee" });
  }
});

module.exports = router;
