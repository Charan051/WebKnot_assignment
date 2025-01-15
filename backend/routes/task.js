const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks");

router.get("/", async (req, res) => {
  const { eventId } = req.query;
  try {
    const tasks = await Task.find({ eventId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

router.post("/", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Error saving task" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, status, deadline } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { name, status, deadline }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
});

router.put("/status/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      const newStatus = task.status === "Pending" ? "Completed" : "Pending";
      task.status = newStatus;
      await task.save();
      res.json(task); 
    } catch (err) {
      res.status(500).json({ error: "Error toggling task status" });
    }
  });

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
