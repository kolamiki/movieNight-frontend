import React, { useEffect } from "react";

import "./MoviePreviewContent.css";
import MoviePreviewDateRuntimeGenre from "./MoviePreviewDateRuntimeGenre";
import MovieNote from "./MovieNote";
import MovieCreators from "./MovieCreators";

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
      <div className="cover-creators-columns">
        <div className="cover-description">
          <img
            src={movieDetails.coverBig}
            alt="movie-preview-cover"
            className="cover-size"
          />
          <p style={{ width: "80%" }}>
            {movieDetails.plot.slice(0, 400) + "..."}
          </p>
        </div>
        <div>
          <MovieCreators
            movieDirector={movieDetails.director}
            movieWriter={movieDetails.writer}
            movieCinematographer={movieDetails.cinematographer}
            cast={movieDetails.cast}
          />
        </div>
      </div>
    </div>
  );
}

export default MoviePreviewContent;
