import { useState } from "react";

import "./MoviePreviewContent.css";
import MovieNote from "./MovieNote";
import MovieCreators from "./MovieCreators";


function MoviePreviewContent({ movieDetails }) {
  const [isPlotExpanded, setIsPlotExpanded] = useState(false);

  const plotText = movieDetails.plot || "No plot available.";
  const showButton = plotText.length > 350;
  const displayedPlot = isPlotExpanded ? plotText : (showButton ? plotText.slice(0, 150) + "..." : plotText);

  // Round rating to 1 decimal place
  const roundedRating = movieDetails.rating ? Math.round(movieDetails.rating * 10) / 10 : 0;

  return (
    <div className="preview-content-grid">
      {/* Top Meta Bar: Year | Runtime | Genres */}
      <div className="meta-bar">
        <span>{movieDetails.year}</span>
        <span className="separator">■</span>
        <span>{movieDetails.runtime} min</span>
        <span className="separator">■</span>
        <span className="genres">
          {Array.isArray(movieDetails.genres) ? movieDetails.genres.join(", ") : movieDetails.genres}
        </span>
      </div>

      <div className="main-content-area">
        {/* Left Column: Poster + Plot */}
        <div className="left-column">
          <img
            src={movieDetails.coverBig || movieDetails.coverMini || "https://via.placeholder.com/300x450?text=No+Cover"}
            alt="movie-poster"
            className="movie-poster-large"
          />
          <div className="plot-section">
            <p className="plot-text">{displayedPlot}</p>
            {showButton && (
              <button
                className="plot-show-more-btn"
                onClick={() => setIsPlotExpanded(!isPlotExpanded)}
              >
                {isPlotExpanded ? "Pokaż mniej" : "Pokaż więcej"}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Rating, Crew, Cast, Streaming */}
        <div className="right-column">
          {/* Rating Section */}
          <div className="rating-section">
            <span className="rating-number">{roundedRating}</span>
            <div className="rating-visuals">
              <MovieNote movieNote={roundedRating} />
            </div>
            {/* Note: MovieNote component inside might need adjustment or we use it just for squares if we can split logic */}
          </div>

          {/* Crew Section */}
          <div className="crew-section">
            <MovieCreators
              movieDirector={movieDetails.director}
              movieWriter={movieDetails.writer}
              movieCinematographer={movieDetails.cinematographer}
              cast={movieDetails.cast} /* Cast is handled separately below */
            />
          </div>

          {/* Streaming Section */}
          <div className="streaming-section-internal">
            <h3 className="section-header">Dostępne na</h3>
            <div className="streamings-row">
              {/* Placeholder for now as per plan */}
              <div className="streaming-placeholder">
                <i className="pi pi-video" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                Streaming availability coming soon...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePreviewContent;
