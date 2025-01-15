import React from "react";

const EventDetails = ({
  event,
  attendees,
  tasks,
  onEditEvent,
  onDeleteEvent,
  onEditAttendee,
  onDeleteAttendee,
  onEditTask,
  onToggleTaskStatus,
  onAddAttendee,
  onAddTask,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">{event.name}</h3>
      <div className="flex justify-end space-x-4">
        <button onClick={onEditEvent} className="text-blue-500">Edit Event</button>
        <button onClick={onDeleteEvent} className="text-red-500">Delete Event</button>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-medium">Attendees</h4>
        <button onClick={onAddAttendee} className="mb-2 text-green-500">Add Attendee</button>
        <ul>
          {attendees.map((attendee) => (
            <li key={attendee._id} className="flex justify-between items-center">
              {attendee.name}
              <button onClick={() => onEditAttendee(attendee)} className="ml-2 text-blue-500">Edit</button>
              <button onClick={() => onDeleteAttendee(attendee)} className="ml-2 text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-medium">Tasks</h4>
        <button onClick={onAddTask} className="mb-2 text-green-500">Add Task</button>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center">
              {task.name} - {task.status}
              <button onClick={() => onEditTask(task)} className="ml-2 text-blue-500">Edit</button>
              <button onClick={() => onToggleTaskStatus(task)} className="ml-2 text-yellow-500">Toggle Status</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
