import React, { useEffect } from "react";

import "./MoviePreviewContent.css";
import MoviePreviewDateRuntimeGenre from "./MoviePreviewDateRuntimeGenre";
import MovieNote from "./MovieNote";

function MoviePreviewContent({ movieDetails }) {
  return (
    <div>
      <div className="movie-preview-title">
        <p>{movieDetails.title}</p>
      </div>
      <div className="below-title">
        <MoviePreviewDateRuntimeGenre
          runtime={movieDetails.runtime}
          releaseDate={movieDetails.year}
          genres={"getunki"}
        />
        <MovieNote movieNote={movieDetails.rating} />
      </div>
    </div>
  );
}

export default MoviePreviewContent;
