import { useState, useEffect } from 'react';
import { fetchNotes, createNote } from '../services/api';
import NoteCard from '../components/NoteCard';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    loadNotes();
  }, [filterTag]);

  const loadNotes = async () => {
    try {
      const res = await fetchNotes(filterTag);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to load notes', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !tag) return;

    try {
      await createNote({ title, description, tag });
      setTitle('');
      setDescription('');
      setTag('');
      loadNotes();
    } catch (err) {
      console.error('Failed to add note', err);
    }
  };

  return (
    <>
      <section className="form-section">
        <h2>Add a Note</h2>
        <form onSubmit={handleSubmit} className="note-form">
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
    </>
  );
}

export default HomePage;
