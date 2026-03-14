import React from 'react';

const NoteCard = ({ title, description, tag }) => {
  return (
    <div className="note-card">
      <div className="note-card-body">
        <h3>{title}</h3>
        <p className="note-desc">{description}</p>
        <span className="meta-tag">{tag}</span>
      </div>
    </div>
  );
};

export default NoteCard;
