import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

import "./WinnerMoviePreview.css";

function WinnerMoviePreview({
  apiOrigin,
  currentMovieNightWinnerDetails,
  movieNightDescription,
  isParticipant,
  handleJoinMovieNight,
}) {
  function structure_winner_movie_details(
    apiOrigin,
    currentMovieNightWinnerDetails
  ) {
    // This function structured the winner movie details to the proper format, which is compatible with Carousel component

    return [
      {
        id: 1,
        value: `${currentMovieNightWinnerDetails?.coverBig}`,
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

  function render_vote_info() {
    return (
      <>
        <h1 className="winner-movie-header">ZAGŁOSUJ</h1>
        <div className="winner-movie-details-or-vote ">
          <div className="winner-movie-details-or-vote vote">
            {movieNightDescription}
            <div className="ticket-button-container">
              {/* Ticket "Join" Button */}
              {!currentMovieNightWinnerDetails?.winnerMovie && !isParticipant && (

                <button
                  className="ticket-button"
                  onClick={handleJoinMovieNight}
                >
                  Zapisz na Wieczorek
                </button>

              )}
            </div>
          </div>
        </div>

      </>
    );
  }

  function render_winner_movie_preview() {
    return (
      <>
        <h1 className="winner-movie-header">OGLĄDAMY</h1>
        <Carousel
          className="winner-movie-details-or-vote"
          value={structure_winner_movie_details(
            apiOrigin,
            currentMovieNightWinnerDetails
          )}
          numVisible={1}
          numScroll={1}
          orientation="horizontal"
          itemTemplate={winnerMovieTemplate}
        />
      </>
    );
  }

  return (
    <div className="winner-movie-content">
      {currentMovieNightWinnerDetails
        ? render_winner_movie_preview()
        : render_vote_info()}
    </div>
  );
}

export default WinnerMoviePreview;
