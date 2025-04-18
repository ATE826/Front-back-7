import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Проверяем статус подключения

  // Загрузка заметок из localStorage при инициализации компонента
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);

    // Проверка на подключение
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));

    return () => {
      window.removeEventListener('online', () => setIsOffline(false));
      window.removeEventListener('offline', () => setIsOffline(true));
    };
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
      saveNotes(updatedNotes); // Сохраняем обновленные заметки
      setNewNote(''); // Очищаем поле ввода
    }
  };

  // Удаление заметки
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    saveNotes(updatedNotes);
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

      {isOffline && <p className="offline-warning">Офлайн-режим</p>}
      
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
};

export default App;
