// const express = require("express");
// const router = express.Router();
// const Event = require("../models/Events");

// router.get("/", async (req, res) => {
//   const events = await Event.find();
//   res.json(events);
// });

// router.post("/", async (req, res) => {
//   const event = new Event(req.body);
//   await event.save();
//   res.status(201).json(event);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Event = require("../models/Events");
const Attendee = require("../models/Attende");
const Task = require("../models/Tasks");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Create a new event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// Edit an event
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, location, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, description, location, date },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

// Delete an event and cascade delete related attendees and tasks
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete attendees related to the event
    await Attendee.deleteMany({ eventId: id });

    // Delete tasks related to the event
    await Task.deleteMany({ eventId: id });

    // Delete the event
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

module.exports = router;
