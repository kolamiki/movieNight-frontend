import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

import "./WinnerMoviePreview.css";

function WinnerMoviePreview({ apiOrigin, currentMovieNightWinnerDetails }) {
  console.log("Winner Movie details", currentMovieNightWinnerDetails);

  function structure_winner_movie_details(
    apiOrigin,
    currentMovieNightWinnerDetails
  ) {
    // This function structured the winner movie details to the proper format, which is compatible with Carousel component

    return [
      {
        id: 1,
        value: `${apiOrigin}${currentMovieNightWinnerDetails?.coverBig}`,
      },
      { id: 2, value: currentMovieNightWinnerDetails?.plot },
      { id: 3, value: currentMovieNightWinnerDetails?.trailerUrl },
    ];
  }

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
    <div className="winner-movie-content">
      <h1 className="winner-movie-header">OGLĄDAMY</h1>
      <Carousel
        className="movie-details-carousel"
        value={structure_winner_movie_details(
          apiOrigin,
          currentMovieNightWinnerDetails
        )}
        numVisible={1}
        numScroll={1}
        orientation="horizontal"
        itemTemplate={winnerMovieTemplate}
      />
    </div>
  );
}

export default WinnerMoviePreview;
