import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';

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
    <div>
      <h1>Заметки</h1>
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Напишите заметку..."
      />
      <button onClick={addNote}>Добавить</button>
      <NoteList notes={notes} />
    </div>
  );
};

export default App;
