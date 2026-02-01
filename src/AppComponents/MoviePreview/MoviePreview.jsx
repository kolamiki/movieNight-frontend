import React, { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import MoviePreviewContent from "./PreviewContent/MoviePreviewContent";

import "./MoviePreview.css";

function MoviePreview({
  apiOrigin,
  movieID,
  isPreviewActive,
  setIsPreviewActive,
}) {
  //Na ten moment komponent działa tylko po przyjęciu movieID.
  // Sprawdź, czy film o wpisanym ID występuje w bazie danych, w przeciwnym wypadku pobierz dane z imdb przy pomocy viewMovieDetails

  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});

  async function get_movie_details(apiOrigin, movieID) {
    // This function fetches movie details from the database or IMDb
    // depending on the movieID provided
    // In the first step, we try to fetch the movie from the local database
    try {
      const response = await fetch(`${apiOrigin}/getMovieFromDB/${movieID}/`);

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.movieID) {
        setMovieDetails(data);
        setIsLoading(false);
        return; // Finish function if the movie is found in the local database
      } else {
        // throw new Error("Film nie znaleziony w lokalnej bazie");
      }
    } catch (error) {
      // console.log(
      //   "Błąd lub brak danych w bazie lokalnej. Szukamy w IMDb",
      //   error
      // );
    }

    // If the movie is not found in the local database, we fetch it from IMDb
    try {
      console.log("Pobieramy dane z IMDb...");
      const response = await fetch(`${apiOrigin}/viewMovieDetails/${movieID}/`);

      if (!response.ok) {
        // throw new Error(
        //   `Nie udało się pobrać danych z IMDb: ${response.status}`
        // );
      }

      const data = await response.json();
      setMovieDetails(data.movieDetails);
      // console.log("Fetched data", data);
    } catch (error) {
      // console.error("Błąd podczas pobierania danych z IMDb:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      // Run get_movie_details function
      get_movie_details(apiOrigin, movieID);
    },
    [movieID]
  );

  return (
    <Dialog
      visible={isPreviewActive}
      onHide={() => setIsPreviewActive(false)}
      style={{
        fontFamily: "Antonio",
        width: "840px",
        height: "850px",
        background: "#222222",
      }}
      draggable={false}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-preview-content-position">
          <MoviePreviewContent movieDetails={movieDetails} />
        </div>
      )}
    </Dialog>
  );
}

export default MoviePreview;
