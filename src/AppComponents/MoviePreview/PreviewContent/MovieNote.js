import React from "react";

import "./MovieNote.css";
function MovieNote({ movieNote }) {
  return (
    <div className="movie-note-position">
      <NumericalNote>{movieNote}</NumericalNote>
      <NoteSquares movieRating={movieNote} />
    </div>
  );
}

export default MovieNote;

function NumericalNote({ children }) {
  return <p className="numerical-note">{children}</p>;
}

function NoteSquares({ movieRating }) {
  return (
    <div className="note-squares-column">
      <div className="note-squares-row">
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
      </div>
      <div className="note-squares-row">
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
        <div className="note-empty-square"></div>
      </div>
    </div>
  );
}
