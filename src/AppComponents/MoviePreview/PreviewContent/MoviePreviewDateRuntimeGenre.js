import React from "react";

import "./MoviePreviewDateRuntimeGenre.css";

function MoviePreviewDateRuntimeGenre({ releaseDate, runtime, genres }) {
  return (
    <div className="date-runtime-genre-position">
      <p>
        <span>{releaseDate}</span> <span className="separator-square"></span>
        <span>{runtime} min</span> <span className="separator-square"></span>
        <span>{genres}</span>
      </p>
    </div>
  );
}

export default MoviePreviewDateRuntimeGenre;
