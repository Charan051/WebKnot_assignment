import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarComponent from "../components/CalendarComponent";
import EventForm from "../components/EventForm";
import EventDetails from "../components/EventDetails";
import Popup from "../components/Popup"; // Import Popup component

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", deadline: "", status: "Pending", assignedAttendee: "" });
  const [newAttendee, setNewAttendee] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", location: "" });

  // State for editing attendee and task
  const [editingAttendee, setEditingAttendee] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [popupType, setPopupType] = useState(""); // "attendee", "task", or "event"

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/event");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchAttendees = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attend?eventId=${eventId}`);
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const fetchTasks = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/task?eventId=${eventId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const newEvent = {
      name: form.name,
      description: form.description,
      location: form.location,
      date: selectedDate,
    };
    try {
      await axios.post("http://localhost:5000/api/event", newEvent);
      fetchEvents();
      setPopupVisible(false); // Close the popup after adding the event
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const eventOnDate = events.find((event) => new Date(event.date).toDateString() === date.toDateString());
    if (eventOnDate) {
      setSelectedEvent(eventOnDate);
      fetchAttendees(eventOnDate._id);
      fetchTasks(eventOnDate._id);
    } else {
      setSelectedEvent(null); // Clear selected event if no event for that day
    }
  };

  const handleDeleteAttendee = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/attend/${editingAttendee._id}`);
      fetchAttendees(selectedEvent._id);
      setEditingAttendee(null);
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  const handleToggleTaskStatus = async (task) => {
    if (!task || !task.status) {
      console.error("Invalid task:", task);
      return;
    }
    try {
      const newStatus = task.status === "Pending" ? "Completed" : "Pending"; // Toggle status

      const response = await axios.put(
        `http://localhost:5000/api/task/status/${task._id}`,
        { status: newStatus }
      );

      const updatedTasks = tasks.map((task) =>
        task._id === response.data._id ? { ...task, status: response.data.status } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>

      <CalendarComponent
        events={events}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
      />
      
      {selectedEvent === null && (
        <EventForm
          form={form}
          setForm={setForm}
          handleAddEvent={async (e) => {
            e.preventDefault();
            try {
              await axios.post("http://localhost:5000/api/event", { ...form, date: selectedDate });
              fetchEvents();
              setForm({ name: "", description: "", location: "", date: "" });
            } catch (error) {
              console.error("Error adding event:", error);
            }
          }}
          selectedDate={selectedDate}
        />
      )}

      {selectedEvent && (
        <div>
          <div className="mb-6">
          <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
            <h4 className="text-lg font-medium">Attendees</h4>
            <button onClick={() => { setPopupType("attendee"); setPopupVisible(true); }} className="mb-2 text-green-500">Add Attendee</button>
            <ul>
              {attendees.map((attendee) => (
                <li key={attendee._id} className="flex justify-between items-center">
                  {attendee.name}
                  <button onClick={() => { setNewAttendee(attendee.name); setEditingAttendee(attendee); setPopupType("attendee"); setPopupVisible(true); }} className="ml-2 text-blue-500">Edit</button>
                  <button onClick={() => { setEditingAttendee(attendee); handleDeleteAttendee(); }} className="ml-2 text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium">Tasks</h4>
            <button onClick={() => { setPopupType("task"); setPopupVisible(true); }} className="mb-2 text-green-500">Add Task</button>
            <ul>
              {tasks.map((task) => (
                <li key={task._id} className="flex justify-between items-center">
                  {task.name} - {task.status}
                  <button onClick={() => { setNewTask(task); setEditingTask(task); setPopupType("task"); setPopupVisible(true); }} className="ml-2 text-blue-500">Edit</button>
                  <button onClick={() => { setEditingTask(task); handleToggleTaskStatus(task); }} className="ml-2 text-yellow-500">Toggle Status</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {popupVisible && (
        <Popup
          popupType={popupType}
          newAttendee={newAttendee}
          setNewAttendee={setNewAttendee}
          newTask={newTask}
          setNewTask={setNewTask}
          attendees={attendees}
          setPopupVisible={setPopupVisible}
          handleAddEvent={handleAddEvent}
          setForm={setForm}
          editingAttendee={editingAttendee}
          editingTask={editingTask}
          setEditingAttendee={setEditingAttendee}
          
          setEditingTask={setEditingTask}
          fetchAttendees={fetchAttendees}
          selectedEvent={selectedEvent}
          handleAddAttendee={async () => {
            const attendeeObj = { name: newAttendee ,eventId: selectedEvent._id,};
            try {
              await axios.post("http://localhost:5000/api/attend",attendeeObj);
              fetchAttendees(selectedEvent._id);
              setNewAttendee("");
              setPopupVisible(false);
            } catch (error) {
              console.error("Error adding attendee:", error);
            }
          }}
          handleAddTask={async () => {
            const taskObj = { ...newTask, eventId: selectedEvent._id };
            try {
              await axios.post("http://localhost:5000/api/task", taskObj);
              fetchTasks(selectedEvent._id);
              setNewTask({ name: "", deadline: "", status: "Pending", assignedAttendee: "" });
              setPopupVisible(false);
            } catch (error) {
              console.error("Error adding task:", error);
            }
          }}
          handleEditAttendee={async () => {
            const attendeeObj = { ...editingAttendee, name: newAttendee };
            try {
              await axios.put(`http://localhost:5000/api/attend/${editingAttendee._id}`, attendeeObj);
              fetchAttendees(selectedEvent._id);
              setPopupVisible(false);
            } catch (error) {
              console.error("Error editing attendee:", error);
            }
          }}
          handleEditTask={async () => {
            const taskObj = { ...editingTask, ...newTask };
            try {
              await axios.put(`http://localhost:5000/api/task/${editingTask._id}`, taskObj);
              fetchTasks(selectedEvent._id);
              setPopupVisible(false);
            } catch (error) {
              console.error("Error editing task:", error);
            }
          }}
        />
      )}
    </div>
  );
}

export default EventManagement;
