const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/research_notes')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// POST /notes - Create a new note
app.post('/notes', async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const note = new Note({ title, description, tag });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /notes - Get all notes (optionally filter by tag)
app.get('/notes', async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tag: new RegExp(tag, 'i') } : {};
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
