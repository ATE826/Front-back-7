import React from 'react';

const Note = ({ note, onDelete, index }) => {
  const handleDelete = () => {
    onDelete(index); // Вызываем функцию удаления при клике
  };

  return (
    <div className="note-item">
      <p>{note}</p>
      <button className="delete-btn" onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default Note;
