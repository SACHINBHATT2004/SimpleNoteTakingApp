import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const addOrEditNote = (note) => {
    let updatedNotes;
    if (currentNote) {
      updatedNotes = notes.map((n) =>
        n.id === currentNote.id ? { ...n, ...note, timestamp: Date.now() } : n
      );
      setCurrentNote(null);
    } else {
      updatedNotes = [
        ...notes,
        { ...note, id: Date.now(), timestamp: Date.now() },
      ];
    }
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
  };

  return (
    <div className="app">
      <h1>Simple Note Taking App</h1>
      <input
        type="text"
        placeholder="Search Notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <NoteForm addOrEditNote={addOrEditNote} currentNote={currentNote} />
      <NotesList
        notes={notes}
        onEdit={handleEditNote}
        onDelete={deleteNote}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default App;
