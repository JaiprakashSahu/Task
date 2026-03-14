import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [filterTag, setFilterTag] = useState('');

  // Fetch notes whenever filterTag changes
  useEffect(() => {
    fetchNotes();
  }, [filterTag]);

  const fetchNotes = async () => {
    try {
      const params = filterTag ? { tag: filterTag } : {};
      const res = await axios.get(`${API_URL}/notes`, { params });
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
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
      fetchNotes();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  return (
    <div className="app">
      <h1>Research Notes Manager</h1>

      <form className="note-form" onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by Tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-msg">No notes found.</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <span className="tag">{note.tag}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
