import React from "react";
import EventForm from "./EventForm"; // import EventForm component

const Popup = ({
  popupType,
  handleAddAttendee,
  handleAddTask,
  handleEditAttendee,
  handleDeleteAttendee,
  handleEditTask,
  handleToggleTaskStatus,
  newAttendee,
  setNewAttendee,
  newTask,
  setNewTask,
  attendees,
  setPopupVisible,
  editingAttendee,
  setEditingAttendee,
  setEditingTask,
  editingTask,
  form, // Add form props for EventForm
  setForm, // Add setForm props for EventForm
  handleAddEvent, // Add handleAddEvent for EventForm
  selectedDate, // Add selectedDate for EventForm
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {popupType === "attendee" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {editingAttendee ? "Edit Attendee" : "Add Attendee"}
            </h3>
            <input
              type="text"
              placeholder="Attendee Name"
              value={newAttendee}
              onChange={(e) => setNewAttendee(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
            <button
              onClick={() => {
                if (editingAttendee) {
                  handleEditAttendee(); // Edit attendee
                } else {
                  handleAddAttendee(); // Add new attendee
                }
                setNewAttendee(""); // Clear input
                setEditingAttendee(false); // Reset editing state
                setPopupVisible(false); // Close popup
              }}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              {editingAttendee ? "Update" : "Add"}
            </button>
            {editingAttendee && (
              <button
                onClick={() => {
                  handleDeleteAttendee(); // Delete attendee
                  setNewAttendee(""); // Clear input
                  setEditingAttendee(false); // Reset editing state
                  setPopupVisible(false); // Close popup
                }}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete Attendee
              </button>
            )}
          </div>
        )}

        {popupType === "task" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {editingTask ? "Edit Task" : "Add Task"}
            </h3>
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              required
              className="border rounded p-2 w-full"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              required
              className="border rounded p-2 w-full mt-2"
            />
            <select
              value={newTask.assignedAttendee}
              onChange={(e) =>
                setNewTask({ ...newTask, assignedAttendee: e.target.value })
              }
              className="border rounded p-2 w-full mt-2"
            >
              <option value="">Select Assignee</option>
              {attendees.map((attendee) => (
                <option key={attendee._id} value={attendee._id}>
                  {attendee.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (editingTask) {
                  handleEditTask(); // Edit task
                } else {
                  handleAddTask(); // Add new task
                }
                setPopupVisible(false); // Close popup
                setNewTask({ name: "", deadline: "", assignedAttendee: "" });
                setEditingTask(false) // Clear task input fields
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              {editingTask ? "Update" : "Add"}
            </button>

            {editingTask && (
              <button
                onClick={() => {
                  handleToggleTaskStatus(); // Toggle task status
                  setPopupVisible(false); // Close popup
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
              >
                Toggle Status
              </button>
            )}
          </div>
        )}

        {popupType === "event" && (
          <EventForm
            form={form}
            setForm={setForm}
            handleAddEvent={handleAddEvent}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
