import React from 'react';

const NoteList = ({ notes }) => {
  return (
    <div>
      <h2>Список заметок</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
