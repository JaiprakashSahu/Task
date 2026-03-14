const Note = require('../models/noteModel');

const getNotes = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tag: new RegExp(tag, 'i') } : {};
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const note = await Note.create({ title, description, tag });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getNotes, createNote };
