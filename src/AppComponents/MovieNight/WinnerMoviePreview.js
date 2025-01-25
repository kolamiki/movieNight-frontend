import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

import "./WinnerMoviePreview.css";
import Header from "../UI_Components/Header";

function WinnerMoviePreview() {
  const [winnerMovieDetails, setWinnerMovieDetails] = useState([
    { id: 1, value: "Napis1" },
  ]);

  //!!! DODAĆ POBIERANIE OBRAZÓW Z BAZY DANYCH

  const winnerMovieTemplate = (winnerMovie) => {
    return (
      <p>
        {winnerMovie.value}, {winnerMovie.id}
      </p>
    );
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
