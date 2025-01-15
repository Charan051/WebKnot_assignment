import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ events, selectedDate, handleDateClick }) => {
  return (
    <Calendar
      onClickDay={handleDateClick}
      value={selectedDate}
      tileContent={({ date }) => {
        const eventOnDate = events.find((event) => new Date(event.date).toDateString() === date.toDateString());
        return eventOnDate ? <span className="text-blue-500 font-bold">•</span> : null;
      }}
      className="mb-6 border rounded"
    />
  );
};

export default CalendarComponent;
