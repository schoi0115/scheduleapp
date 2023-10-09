import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Divider } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
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
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Schedule App
            </Typography>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              type="date"
        
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <TextField
              type="time"
        
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              margin="dense"
              multiline
              rows={4}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={editingEventIndex !== null ? <Edit /> : <Add />}
              onClick={handleAddEvent}
              fullWidth
            >
              {editingEventIndex !== null ? 'Update Event' : 'Add Event'}
            </Button>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Calendar View
            </Typography>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
            />
          </Grid> */}
     

          {/* Add the event related pictures, theme, or music(alarm ++) */}
        </Grid>
      </Paper>

      <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Event List
        </Typography>
        <List>
          {events.map((event, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={event.title}
                  secondary={`${event.date} ${event.time}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEditEvent(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteEvent(index)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Typography variant="body2">
                {event.description}
              </Typography>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
