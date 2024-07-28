import React, { useState, useEffect } from 'react';

const NoteForm = ({ addOrEditNote, currentNote }) => {
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    if (currentNote) {
      setNote({
        title: currentNote.title,
        content: currentNote.content,
      });
    } else {
      setNote({ title: '', content: '' });
    }
  }, [currentNote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) return;
    addOrEditNote(note);
    setNote({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={note.content}
        onChange={handleInputChange}
        placeholder="Content"
        required
      />
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
