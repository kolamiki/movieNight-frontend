import React, { useState, useEffect } from "react";

import "primeflex/primeflex.css";

import "./MovieSurveyResults.css";

import MovieSurveyCandidate from "./MovieSurveyCandidate";

function MovieSurveyResults({ apiOrigin, movieNightCandidatesData }) {
  // useEffect(function () {}, []);

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
              votes={7} //{movieCandidate?.votes}
              participants={10}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieSurveyResults;
