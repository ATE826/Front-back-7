import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      <h2>Список заметок</h2>
      {notes.length === 0 ? (
        <p>Заметки не найдены</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <Note note={note} index={index} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
