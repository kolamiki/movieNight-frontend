import React, { useState, useEffect } from "react";

import "primeflex/primeflex.css";

import "./MovieSurveyResults.css";

import MovieSurveyCandidate from "./MovieSurveyCandidate";

function MovieSurveyResults({
  apiOrigin,
  movieNightCandidatesData,
  movieNightCategory,
  participants,
  votes,
  isMovieNightActive,
  setIsVoted,
}) {
  // useEffect(function () {}, []);

  console.log("Votes", votes);

  // useEffect(function () {}, [isVoted === true]);

  return (
    <div className="movie-survey-results">
      <div class="flex flex-column">
        {movieNightCandidatesData?.map((movieCandidate, index) => {
          // console.log(movieCandidate);
          return (
            <MovieSurveyCandidate
              key={index}
              apiOrigin={apiOrigin}
              movieTitle={movieCandidate?.title}
              movieNightCategory={movieNightCategory}
              moviePosterMini={movieCandidate?.coverSmall}
              votes={votes}
              participants={participants}
              isMovieNightActive={isMovieNightActive}
              setIsVoted={setIsVoted}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieSurveyResults;
