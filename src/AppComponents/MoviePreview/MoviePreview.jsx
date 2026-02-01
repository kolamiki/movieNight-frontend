import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import MoviePreviewContent from "./PreviewContent/MoviePreviewContent";
import "./MoviePreview.css";

/**
 * MoviePreview Component
 * 
 * Displays detailed information about a movie in a modal dialog.
 * It first attempts to fetch data from the local database. 
 * If not found, it falls back to fetching from an external source (IMDb/TMDB) via the backend.
 * 
 * @param {string} apiOrigin - Base URL for the API
 * @param {string} movieID - ID of the movie to display
 * @param {boolean} isPreviewActive - Controls visibility of the dialog
 * @param {function} setIsPreviewActive - State setter for dialog visibility
 */
function MoviePreview({
  apiOrigin,
  movieID,
  isPreviewActive,
  setIsPreviewActive,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (!movieID || !isPreviewActive) return;

    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        // 1. Try fetching from local database
        const dbResponse = await fetch(`${apiOrigin}/getMovieFromDB/${movieID}/`);

        if (dbResponse.ok) {
          const dbData = await dbResponse.json();
          if (dbData.movieID) {
            setMovieDetails(dbData);
            setIsLoading(false);
            return;
          }
        }

        // 2. If not in DB, fetch from External API (TMDB via Backend)
        console.log("Movie not in DB, fetching from external source...");
        const externalResponse = await fetch(`${apiOrigin}/viewMovieDetails/${movieID}/`);

        if (externalResponse.ok) {
          const externalData = await externalResponse.json();
          setMovieDetails(externalData.movieDetails);
        } else {
          console.error("Failed to fetch movie details from external source.");
        }

      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [apiOrigin, movieID, isPreviewActive]);

  return (
    <Dialog
      visible={isPreviewActive}
      onHide={() => setIsPreviewActive(false)}
      header={movieDetails?.title || "Szczegóły filmu"}
      className="movie-preview-dialog" // Moved inline styles to CSS class
      draggable={false}
      dismissableMask
    >
      {isLoading ? (
        <div className="flex justify-content-center align-items-center h-full">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#fff' }}></i>
        </div>
      ) : (
        <div className="movie-preview-content-position">
          <MoviePreviewContent movieDetails={movieDetails} />
        </div>
      )}
    </Dialog>
  );
}

export default MoviePreview;
