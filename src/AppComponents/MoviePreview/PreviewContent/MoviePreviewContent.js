import React, { useEffect } from "react";

import "./MoviePreviewContent.css";
import MoviePreviewDateRuntimeGenre from "./MoviePreviewDateRuntimeGenre";

function MoviePreviewContent({ movieDetails }) {
  return (
    <div>
      <div className="movie-preview-title">
        <p>{movieDetails.title}</p>
      </div>
      <MoviePreviewDateRuntimeGenre
        runtime={movieDetails.runtime}
        releaseDate={movieDetails.year}
        genres={"getunki"}
      />
    </div>
  );
}

export default MoviePreviewContent;
