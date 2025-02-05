import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

import "./WinnerMoviePreview.css";
import Header from "../UI_Components/Header";

function WinnerMoviePreview({ apiOrigin }) {
  const [winnerMovieDetails, setWinnerMovieDetails] = useState([
    { id: 1, value: "http://127.0.0.1:8000/media/bigCovers/The_Substance.jpg" },
    { id: 2, value: "Napis2" },
    { id: 3, value: "Napis3" },
  ]);

  //!!! DODAĆ POBIERANIE DANYCH Z WYKORZYTANIEM APIORIGIN

  function get_winner_movie_details(apiOrigin) {
    // This function gets the winner movie details and assign fetched data to the winnerMovieDetail state
  }

  useEffect(function () {
    fetch(`${apiOrigin}`);
  }, []);

  function display_proper_movie_detail(movieDetail) {
    if (movieDetail.id === 1) {
      return (
        <img
          className="movie-in-carousel-cover "
          src={movieDetail.value}
          alt="WinnerPicture"
        />
      );
    }
    if (movieDetail.id === 2) {
      return <p>{movieDetail.value} - OPIS</p>;
    }
    if (movieDetail.id === 3) {
      return <p>{movieDetail.value} - ZWIASTUN</p>;
    }
  }

  const winnerMovieTemplate = (winnerMovie) => {
    return <>{display_proper_movie_detail(winnerMovie)}</>;
  };

  return (
    <div>
      <h1 className="winner-movie-header">OGLĄDAMY</h1>
      <Carousel
        className="movie-details-carousel"
        value={winnerMovieDetails}
        numVisible={1}
        numScroll={1}
        orientation="horizontal"
        itemTemplate={winnerMovieTemplate}
      />
    </div>
  );
}

export default WinnerMoviePreview;
