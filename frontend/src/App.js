import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Загрузка заметок из localStorage при инициализации компонента
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  // Функция для сохранения заметок в localStorage
  const saveNotes = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  // Добавление новой заметки
  const addNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [...notes, newNote];
      saveNotes(updatedNotes);  // Сохраняем обновленные заметки
      setNewNote('');  // Очищаем поле ввода
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">Заметки</h1>
      </header>
      <section className="note-section">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Напишите заметку..."
          className="note-input"
        />
        <button onClick={addNote} className="add-note-btn">Добавить</button>
      </section>
      <NoteList notes={notes} />
    </div>
  );
};

export default App;
