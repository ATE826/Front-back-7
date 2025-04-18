import React from 'react';

const Note = ({ note }) => {
  return (
    <div>
      <p>{note}</p>
      <button>Удалить</button>
    </div>
  );
};

export default Note;
