import React from "react";

const EventForm = ({ form, setForm, handleAddEvent, selectedDate }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Add Event on {selectedDate.toDateString()}</h3>
      <form onSubmit={handleAddEvent}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="border rounded p-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="border rounded p-2 w-full"
          ></textarea>
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;