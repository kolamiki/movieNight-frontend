import React from "react";

import "./MovieNote.css";
function MovieNote() {
  return <div className="movie-note-position"></div>;
}

export default MovieNote;

function NumercalNote({ children }) {
  return <p className="numerical-note">{children}</p>;
}
