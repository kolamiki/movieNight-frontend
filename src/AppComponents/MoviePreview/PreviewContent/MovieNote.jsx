import React from "react";

import "./MovieNote.css";

function MovieNote({ movieNote, showNumber = true }) {
  // Component to show movie note (number) and it square representation
  return (
    <div className="movie-note-position">
      {showNumber && <NumericalNote>{movieNote}</NumericalNote>}
      <NoteSquares movieRating={movieNote} />
    </div>
  );
}

export default MovieNote;

function NumericalNote({ children }) {
  return <p className="numerical-note">{children}</p>;
}

function NoteSquares({ movieRating }) {
  const totalSquares = 10; // 10 pól w dwóch rzędach
  const fullSquares = Math.floor(movieRating);
  const fractionalPart = movieRating % 1;

  function getSquareStyle(squareIndex, fullSquares, fractionalPart) {
    // Function to fill squares based on the note
    if (squareIndex <= fullSquares) {
      return { backgroundColor: "white" };
    } else if (squareIndex === fullSquares + 1 && fractionalPart > 0) {
      return {
        background: `linear-gradient(to right, white ${fractionalPart * 100
          }%, transparent ${fractionalPart * 100}%)`,
      };
    }
    return {};
  }

  return (
    <div className="note-squares-column">
      {[0, 1].map((row) => (
        <div className="note-squares-row" key={row}>
          {Array.from({ length: 5 }).map((_, index) => {
            const squareIndex = row * 5 + index + 1;
            return (
              <div
                key={index}
                className="note-empty-square"
                style={getSquareStyle(squareIndex, fullSquares, fractionalPart)}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
