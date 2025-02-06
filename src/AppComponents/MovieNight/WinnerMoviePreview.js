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

  function format_movie_description(plot, rating) {
    return;
  }

  function get_winner_movie_details(apiOrigin, winnerMovieNightName) {
    // This function gets the winner movie details and assigns fetched data to the winnerMovieDetail state
    fetch(`${apiOrigin}getMovieNight/${winnerMovieNightName}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["winnerMovie"]);
        // Add fetched data to the state
        setWinnerMovieDetails(() => {
          return [
            { id: 1, value: `${apiOrigin}${data["winnerMovie"]["coverBig"]}` },
            { id: 2, value: data["winnerMovie"]["plot"] },
            { id: 3, value: data["winnerMovie"]["trailerUrl"] },
          ];
        });
      });
  }

  useEffect(function () {
    get_winner_movie_details(apiOrigin, "Test");
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
      return <p className="movie-in-carousel-plot">{movieDetail.value}</p>;
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
