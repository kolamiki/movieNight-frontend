import React, { useState, useEffect } from "react";

import "primeflex/primeflex.css";

import "./MovieSurveyResults.css";

import MovieSurveyCandidate from "./MovieSurveyCandidate";

function MovieSurveyResults({
  apiOrigin,
  movieNightCandidatesData,
  participants,
  votes,
}) {
  // useEffect(function () {}, []);

  console.log("Votes", votes);

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
              moviePosterMini={movieCandidate?.coverSmall}
              votes={votes}
              participants={participants}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieSurveyResults;
