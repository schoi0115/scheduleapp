import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (editingEventIndex !== null) {
      // If we're editing an event, update it
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex] = newEvent;
      setEvents(updatedEvents);
      setEditingEventIndex(null);
    } else {
      // Otherwise, add a new event
      setEvents([...events, newEvent]);
    }
    setNewEvent({ title: '', date: '', time: '', description: '' });
  };

  const handleEditEvent = (index) => {
    const eventToEdit = events[index];
    setNewEvent(eventToEdit);
    setEditingEventIndex(index);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
    setEditingEventIndex(null);
  };

  return (
    <div>
      <h1>Schedule App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <button onClick={handleAddEvent}>
          {editingEventIndex !== null ? 'Update Event' : 'Add Event'}
        </button>
      </div>
      {/* <div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </div> */}
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong> - {event.date} {event.time}{' '} {event.description}
            <button onClick={() => handleEditEvent(index)}>Edit</button>
            <button onClick={() => handleDeleteEvent(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
