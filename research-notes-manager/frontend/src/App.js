import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from './components/NoteCard';
import './App.css';

// Use environment variable for API URL or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [filterTag, setFilterTag] = useState('');

  // Load notes on mount and when filter changes
  useEffect(() => {
    loadNotes();
  }, [filterTag]);

  const loadNotes = async () => {
    try {
      const params = filterTag ? { tag: filterTag } : {};
      const res = await axios.get(`${API_URL}/notes`, { params });
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to load notes', err);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !description || !tag) return;

    try {
      await axios.post(`${API_URL}/notes`, { title, description, tag });
      setTitle('');
      setDescription('');
      setTag('');
      loadNotes(); // refresh list
    } catch (err) {
      console.error('Failed to add note', err);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Research Notes Manager</h1>
      </header>

      <main>
        <section className="form-section">
          <h2>Add a Note</h2>
          <form onSubmit={addNote} className="note-form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
            <input
              type="text"
              placeholder="Tag (e.g. AI, Physics)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button type="submit">Create Note</button>
          </form>
        </section>

        <section className="notes-section">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Filter notes by tag..."
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            />
          </div>

          <div className="notes-grid">
            {notes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  description={note.description}
                  tag={note.tag}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
